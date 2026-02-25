import {
	NodeConnectionTypes,
	type INodeProperties,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import {
	clientOperations,
	experimentOperations,
	reportOperations,
	schemaOperations,
} from './config/operations';
import { allParameters } from './config/properties';

const createOperationProperty = (
	resource: string,
	options: INodeProperties['options'],
	defaultValue: string,
): INodeProperties => {
	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: [resource] } },
		options,
		default: defaultValue,
	};
};

export class Varify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Varify',
		name: 'varify',
		icon: { light: 'file:../../icons/github.svg', dark: 'file:../../icons/github.dark.svg' },
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

			createOperationProperty('experiment', experimentOperations, 'getAll'),
			createOperationProperty('client', clientOperations, 'getAllClients'),
			createOperationProperty('report', reportOperations, 'getReport'),
			createOperationProperty('schema', schemaOperations, 'getAudienceTargetingSchema'),

			...allParameters,
		],
	};
}
