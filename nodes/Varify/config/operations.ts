/**
 * Operation option definitions for each resource type.
 * Each array is in n8n's native option format and can be passed
 * directly to the `options` field of an operation property.
 */

import { INodeProperties } from 'n8n-workflow';

/**
 * Experiment resource operations
 */
export const experimentOperations: INodeProperties['options'] = [
	{
		name: 'Get Many',
		value: 'getAll',
		description: 'Retrieve all experiments with optional filtering and pagination',
		action: 'Get all experiments',
		routing: {
			request: {
				method: 'GET',
				url: '/papi/experiments',
			},
		},
	},
	{
		name: 'Get',
		value: 'get',
		description: 'Retrieve a single experiment by ID',
		action: 'Get an experiment',
		routing: {
			request: {
				method: 'GET',
				url: '=/papi/experiments/{{$parameter.experimentId}}',
			},
		},
	},
	{
		name: 'Create',
		value: 'create',
		description: 'Create a new experiment with variations and targeting rules',
		action: 'Create an experiment',
		routing: {
			request: {
				method: 'POST',
				url: '/papi/experiments',
			},
		},
	},
	{
		name: 'Update',
		value: 'update',
		description: 'Update an existing experiment',
		action: 'Update an experiment',
		routing: {
			request: {
				method: 'PATCH',
				url: '=/papi/experiments/{{$parameter.experimentId}}',
			},
		},
	},
	{
		name: 'Update Status',
		value: 'updateStatus',
		description: 'Update the status of an experiment (draft, active, paused, completed)',
		action: 'Update experiment status',
		routing: {
			request: {
				method: 'POST',
				url: '=/papi/experiments/{{$parameter.experimentId}}/status',
			},
		},
	},
	{
		name: 'Duplicate',
		value: 'duplicate',
		description: 'Create a copy of an existing experiment',
		action: 'Duplicate an experiment',
		routing: {
			request: {
				method: 'POST',
				url: '=/papi/experiments/{{$parameter.experimentId}}/duplicate',
			},
		},
	},
	{
		name: 'Update Traffic Allocation',
		value: 'updateTrafficAllocation',
		description: 'Update traffic allocation percentages for experiment variations',
		action: 'Update traffic allocation',
		routing: {
			request: {
				method: 'POST',
				url: '=/papi/experiments/{{$parameter.experimentId}}/traffic-allocation',
			},
		},
	},
	{
		name: 'Toggle Tracking',
		value: 'toggleTracking',
		description: 'Enable or disable tracking for an experiment',
		action: 'Toggle experiment tracking',
		routing: {
			request: {
				method: 'POST',
				url: '=/papi/experiments/{{$parameter.experimentId}}/toggle-tracking',
			},
		},
	},
];

/**
 * Client resource operations
 */
export const clientOperations: INodeProperties['options'] = [
	{
		name: 'Get All',
		value: 'getAllClients',
		description: 'Retrieve all clients',
		action: 'Get all clients',
		routing: {
			request: {
				method: 'GET',
				url: '/papi/clients',
			},
		},
	},
];

/**
 * Report resource operations
 */
export const reportOperations: INodeProperties['options'] = [
	{
		name: 'Get Report',
		value: 'getReport',
		description: 'Retrieve experiment performance report',
		action: 'Get experiment report',
		routing: {
			request: {
				method: 'GET',
				url: '=/papi/experiments/{{$parameter.experimentId}}/report',
				qs: {
					end_date: '{{$parameter.end_date}}',
					report_type: '{{$parameter.report_type}}',
					start_date: '{{$parameter.start_date}}',
				},
			},
		},
	},
	{
		name: 'Get Daily Report',
		value: 'getDailyReport',
		description: 'Retrieve daily breakdown of experiment performance',
		action: 'Get daily report',
		routing: {
			request: {
				method: 'GET',
				url: '=/papi/experiments/{{$parameter.experimentId}}/daily-report',
			},
		},
	},
	{
		name: 'Get Raw Revenue Report',
		value: 'getRawRevenueReport',
		description: 'Retrieve raw revenue data for experiment',
		action: 'Get raw revenue report',
		routing: {
			request: {
				method: 'GET',
				url: '=/papi/experiments/{{$parameter.experimentId}}/raw-revenue-report',
			},
		},
	},
];

/**
 * Schema resource operations
 */
export const schemaOperations: INodeProperties['options'] = [
	{
		name: 'Get Audience Targeting Schema',
		value: 'getAudienceTargetingSchema',
		description: 'Retrieve the schema for audience targeting rules',
		action: 'Get audience targeting schema',
		routing: {
			request: {
				method: 'GET',
				url: '/papi/schema/audience-targeting',
			},
		},
	},
	{
		name: 'Get Page Targeting Schema',
		value: 'getPageTargetingSchema',
		description: 'Retrieve the schema for page targeting rules',
		action: 'Get page targeting schema',
		routing: {
			request: {
				method: 'GET',
				url: '/papi/schema/page-targeting',
			},
		},
	},
];
