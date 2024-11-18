import json
import requests
import boto3
from botocore.exceptions import ClientError

# Initialize DynamoDB resource and client outside the handler for better performance
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('NewsArticles')  # Your DynamoDB table name

# Set your News API key
api_key = "89cfd1a0135943c78a5c9c4e6347e322"  # Use your actual API key
news_api_url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}"

def lambda_handler(event, context):
    try:
        # Fetch news from the News API
        response = requests.get(news_api_url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the response
        articles = response.json().get("articles", [])

        # Aggregating news
        aggregated_news = [
            {
                "title": article["title"],
                "url": article["url"],
                "publishedAt": article["publishedAt"],
            }
            for article in articles
        ]

        # Save each article to DynamoDB
        for article in aggregated_news:
            try:
                item = {
                    "ArticleID": article["url"],  # Unique identifier (Article URL)
                    "Title": article["title"],     # Article title
                    "URL": article["url"],         # Article URL
                    "PublishedAt": article["publishedAt"],  # Article published date
                }

                # Put item into DynamoDB
                table.put_item(Item=item)
            except ClientError as e:
                # Enhanced logging of the error
                print(f"Failed to insert article '{article['title']}' into DynamoDB: {e.response['Error']['Message']}")
                continue  # Skip this article if it fails to insert

        # Return the aggregated news
        return {
            "statusCode": 200,
            "body": json.dumps(aggregated_news),  # Ensure the list is returned as proper JSON
        }

    except requests.exceptions.RequestException as e:
        # Handle error when fetching news
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"Failed to fetch news from NewsAPI: {str(e)}"}),
        }

    except Exception as e:
        # Handle other unexpected errors
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"An error occurred: {str(e)}"}),
        }
