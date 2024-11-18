import boto3
import logging

logging.basicConfig(level=logging.DEBUG)

dynamodb = boto3.client('dynamodb', region_name='ap-south-1')

item = {
    "ArticleID": {"S": "https://example.com"},
    "Title": {"S": "Example News"},
    "URL": {"S": "https://example.com"},
    "PublishedAt": {"S": "2024-11-17T00:00:00Z"},
}

response = dynamodb.put_item(
    TableName="NewsArticles",
    Item=item
)

print(response)
