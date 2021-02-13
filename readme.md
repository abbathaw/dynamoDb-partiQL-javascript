# Using PartiQL to query AWS DynamoDb in Javascript.

This github repo contains the code examples and a getting started part to follow along with this [article](https://abba.dev/blog/dynamodb-partiql-javascript).

In that article, I compare ways of querying and inserting data into dynamoDb using PartiQL vs using the Document API using the AWS Javascript SDK.

### Getting Started

1. Download or clone this git repository.
1. If your environment doesn't already have your AWS profile, then setup the AWS credentials by creating a `.env` file with the same keys in the `sample.env`.
1. This code uses the `us-east-1` region. If you want to use a different region, change the value in `aws-config.js`. Though, keep in mind that PartiQL support for DynamoDb is only supported in these regions at the time of writing this: US West (N. California), US West (Oregon), US East (N. Virginia), Europe (Ireland), Asia Pacific (Tokyo), and Asia Pacific (Seoul).
1. Run `npm run get-started`. This will create a new DynamoDb table called `Movies` and upload some sample data.

### Running code samples to query uploaded data

The code examples for querying the data are in the folder `./query-data`.

Check the files and change the paramaters if you would like to query something different.

You can run the examples using the command line:

```
// To run the code example for querying using the dynamoDb partiQL api.

node query-data/query-partiQL.js

// To run the code example for querying using the dynamoDb document client.

node query-data/query-documentAPI.js

```

### Running code samples to insert sample data

The code examples for inserting random movie data are in the folder `./insert-data`.

Check the files and change the paramaters if you would like to insert something different.

You can run the examples using the command line:

```
// To run the code example for inserting data using the dynamoDb partiQL api.

node insert-data/insert-partiQL.js

// To run the code example for inserting data using the dynamoDb document client.

node insert-data/insert-documentAPI.js

```