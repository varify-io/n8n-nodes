# n8n-nodes-varify

This is an n8n community node. It lets you use [Varify.io](https://varify.io/) in your n8n workflows.

Varify.io is an A/B testing platform. This node allows you to manage experiments, control traffic allocation, and retrieve targeting schemas through the Varify API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Experiment

- **Get Many** - Retrieve all experiments with filtering, sorting, and pagination
- **Get** - Retrieve a single experiment by ID
- **Create** - Create a new experiment with variations and targeting rules
- **Update** - Update an existing experiment
- **Update Status** - Change experiment status (active, paused, archived, etc.)
- **Duplicate** - Create a copy of an existing experiment
- **Update Traffic Allocation** - Update traffic allocation percentages for variations
- **Toggle Tracking** - Enable or disable tracking for an experiment

### Schema

- **Get Audience Targeting Schema** - Retrieve the schema for audience targeting rules
- **Get Page Targeting Schema** - Retrieve the schema for page targeting rules

## Credentials

This node authenticates via **OAuth2** using client credentials.

1. Log in to your [Varify.io](https://app.varify.io/) account.
2. Obtain your OAuth2 **Client ID** and **Client Secret** from your account settings.
3. In n8n, create a new **varify.io OAuth2 API** credential and enter your Client ID and Client Secret.

Refer to the [Varify.io API documentation](https://varify.io/userdocumentation/experiment-api/) for more information.

## Compatibility

Tested with n8n v1.60.0 and later.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Varify.io API documentation](https://varify.io/userdocumentation/experiment-api/)
- [Varify.io OpenAPI docs](https://developers.varify.io/)
