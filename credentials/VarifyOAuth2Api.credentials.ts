import type { Icon, ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';

const VARIFY_SCOPES =
	'create-experiment duplicate-experiment show-experiment list-experiments update-experiment update-experiment-tracking update-experiment-status update-experiment-traffic-allocation list-clients';

export class VarifyOAuth2Api implements ICredentialType {
	name = 'varifyOAuth2Api';

	displayName = 'varify.io OAuth2 API';
	documentationUrl = 'https://varify.io/userdocumentation/experiment-api/';
	icon = 'file:../icons/logo.svg' as Icon;
	extends = ['oAuth2Api'];

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'apiBaseUrl',
			type: 'hidden',
			default: 'https://app.varify.io',
			required: true,
			description: 'Base URL without trailing slash',
		},

		// OAuth2 endpoints (needed by oAuth2Api)
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://app.varify.io/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://app.varify.io/oauth/token',
		},

		// Client credentials flow
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},

		// Optional: default scopes (you can keep this visible if you want)
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: VARIFY_SCOPES,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiBaseUrl}}',
			url: '/oauth/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: {
				grant_type: 'client_credentials',
				client_id: '={{$credentials.clientId}}',
				client_secret: '={{$credentials.clientSecret}}',
				scope: VARIFY_SCOPES,
			},
		},
	};
}
