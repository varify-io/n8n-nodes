/**
 * Operation definitions for Laravel API resources
 * This file defines all available operations for each resource type,
 * including HTTP methods, endpoints, and authentication requirements.
 */

/**
 * Resource types available in the Laravel API
 */
export type Resource = 'experiment' | 'client' | 'report' | 'schema';

/**
 * All available operations across all resources
 */
export type Operation =
	// Experiment operations
	| 'getAll'
	| 'get'
	| 'create'
	| 'update'
	| 'updateStatus'
	| 'duplicate'
	| 'updateTrafficAllocation'
	| 'toggleTracking'
	// Client operations
	| 'getAllClients'
	// Report operations
	| 'getReport'
	| 'getDailyReport'
	| 'getRawRevenueReport'
	// Schema operations
	| 'getAudienceTargetingSchema'
	| 'getPageTargetingSchema';

/**
 * Definition of an API operation including method, endpoint, and requirements
 */
export interface OperationDefinition {
	name: string;
	value: Operation;
	description: string;
	action: string;
	method: 'GET' | 'POST' | 'PATCH';
	endpoint: string;
	requiresAuth: boolean;
	requiresXClientId: boolean;
}

/**
 * Experiment resource operations
 */
export const experimentOperations: OperationDefinition[] = [
	{
		name: 'Get All',
		value: 'getAll',
		description: 'Retrieve all experiments with optional filtering and pagination',
		action: 'Get all experiments',
		method: 'GET',
		endpoint: '/papi/experiments',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Get',
		value: 'get',
		description: 'Retrieve a single experiment by ID',
		action: 'Get an experiment',
		method: 'GET',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Create',
		value: 'create',
		description: 'Create a new experiment with variations and targeting rules',
		action: 'Create an experiment',
		method: 'POST',
		endpoint: '/papi/experiments',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Update',
		value: 'update',
		description: 'Update an existing experiment',
		action: 'Update an experiment',
		method: 'PATCH',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Update Status',
		value: 'updateStatus',
		description: 'Update the status of an experiment (draft, active, paused, completed)',
		action: 'Update experiment status',
		method: 'POST',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/status',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Duplicate',
		value: 'duplicate',
		description: 'Create a copy of an existing experiment',
		action: 'Duplicate an experiment',
		method: 'POST',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/duplicate',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Update Traffic Allocation',
		value: 'updateTrafficAllocation',
		description: 'Update traffic allocation percentages for experiment variations',
		action: 'Update traffic allocation',
		method: 'POST',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/traffic-allocation',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Toggle Tracking',
		value: 'toggleTracking',
		description: 'Enable or disable tracking for an experiment',
		action: 'Toggle experiment tracking',
		method: 'POST',
		endpoint: '=/papi/experiments/{{$parameter.experiment}}/toggle-tracking',
		requiresAuth: true,
		requiresXClientId: true,
	},
];

/**
 * Client resource operations
 */
export const clientOperations: OperationDefinition[] = [
	{
		name: 'Get All',
		value: 'getAllClients',
		description: 'Retrieve all clients',
		action: 'Get all clients',
		method: 'GET',
		endpoint: '/papi/clients',
		requiresAuth: true,
		requiresXClientId: true,
	},
];

/**
 * Report resource operations
 */
export const reportOperations: OperationDefinition[] = [
	{
		name: 'Get Report',
		value: 'getReport',
		description: 'Retrieve experiment performance report',
		action: 'Get experiment report',
		method: 'GET',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/report',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Get Daily Report',
		value: 'getDailyReport',
		description: 'Retrieve daily breakdown of experiment performance',
		action: 'Get daily report',
		method: 'GET',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/daily-report',
		requiresAuth: true,
		requiresXClientId: true,
	},
	{
		name: 'Get Raw Revenue Report',
		value: 'getRawRevenueReport',
		description: 'Retrieve raw revenue data for experiment',
		action: 'Get raw revenue report',
		method: 'GET',
		endpoint: '=/papi/experiments/{{$parameter.experimentId}}/raw-revenue-report',
		requiresAuth: true,
		requiresXClientId: true,
	},
];

/**
 * Schema resource operations
 */
export const schemaOperations: OperationDefinition[] = [
	{
		name: 'Get Audience Targeting Schema',
		value: 'getAudienceTargetingSchema',
		description: 'Retrieve the schema for audience targeting rules',
		action: 'Get audience targeting schema',
		method: 'GET',
		endpoint: '/papi/schema/audience-targeting',
		requiresAuth: false,
		requiresXClientId: false,
	},
	{
		name: 'Get Page Targeting Schema',
		value: 'getPageTargetingSchema',
		description: 'Retrieve the schema for page targeting rules',
		action: 'Get page targeting schema',
		method: 'GET',
		endpoint: '/papi/schema/page-targeting',
		requiresAuth: false,
		requiresXClientId: false,
	},
];

/**
 * Map of resources to their operations
 */
export const operationsByResource: Record<Resource, OperationDefinition[]> = {
	experiment: experimentOperations,
	client: clientOperations,
	report: reportOperations,
	schema: schemaOperations,
};

/**
 * Get operation definition by resource and operation value
 *
 * @param resource - The resource type
 * @param operation - The operation value
 * @returns The operation definition or undefined if not found
 */
export function getOperationDefinition(
	resource: Resource,
	operation: Operation,
): OperationDefinition | undefined {
	const operations = operationsByResource[resource];
	return operations?.find((op) => op.value === operation);
}

/**
 * Get all operations for a resource as n8n option format
 *
 * @param resource - The resource type
 * @returns Array of operation options for n8n dropdown
 */
export function getOperationOptions(resource: Resource) {
	const operations = operationsByResource[resource];
	return operations.map((op) => ({
		name: op.name,
		value: op.value,
		description: op.description,
		action: op.action,
	}));
}
