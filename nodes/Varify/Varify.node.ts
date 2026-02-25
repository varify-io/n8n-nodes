import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import {
	clientOperations,
	experimentOperations,
	reportOperations,
	schemaOperations,
} from './config/operations';
import { experimentParameters } from './config/properties';

export class Varify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Varify',
		name: 'varify',
		icon: { light: 'file:../../icons/github.svg', dark: 'file:../../icons/github.dark.svg' },
		// confirm group
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Varify api',
		defaults: {},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'varifyOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiBaseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Experiment',
						value: 'experiment',
						description: 'Manage A/B testing experiments',
					},
					{
						name: 'Client',
						value: 'client',
						description: 'Retrieve client information',
					},
					{
						name: 'Report',
						value: 'report',
						description: 'Access experiment reports',
					},
					{
						name: 'Schema',
						value: 'schema',
						description: 'Retrieve targeting schemas',
					},
				],
				default: 'experiment',
			},

			// Experiment operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['experiment'],
					},
				},
				options: experimentOperations,
				default: 'getAll',
			},

			// Client operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['client'],
					},
				},
				options: clientOperations,
				default: 'getAllClients',
			},

			// Report operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['report'],
					},
				},
				options: reportOperations,
				default: 'getReport',
			},

			// Schema operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['schema'],
					},
				},
				options: schemaOperations,
				default: 'getAudienceTargetingSchema',
			},

			// Experiment parameters
			...experimentParameters,
		],
	};
}
