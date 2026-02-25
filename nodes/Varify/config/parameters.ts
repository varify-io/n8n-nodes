/**
 * Parameter definitions for Varify API operations
 * This file defines all input parameters for each operation,
 * including path parameters, query parameters, and request body fields.
 */

import { INodeProperties } from 'n8n-workflow';

/**
 * Experiment ID parameter - required for single experiment operations
 * Used by: get, update, updateStatus, duplicate, updateTrafficAllocation, toggleTracking
 * Also used by all report operations
 */
export const experimentIdParameter: INodeProperties = {
	displayName: 'Experiment ID',
	name: 'experimentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['experiment', 'report'],
			operation: [
				'get',
				'update',
				'updateStatus',
				'duplicate',
				'updateTrafficAllocation',
				'toggleTracking',
				'getReport',
				'getDailyReport',
				'getRawRevenueReport',
			],
		},
	},
	default: '',
	description: 'The ID of the experiment',
	placeholder: 'exp_123abc',
};

/**
 * Pagination parameters for getAll operation
 */
export const paginationParameters: INodeProperties[] = [
	{
		displayName: 'Page ID',
		name: 'page_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		default: 1,
		description: 'The page number to retrieve (starts at 1)',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Per Page',
		name: 'per_page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		default: 15,
		description: 'Number of items to return per page',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
	},
];

/**
 * Filtering and sorting parameters for getAll operation
 */
export const filteringParameters: INodeProperties[] = [
	{
		displayName: 'Filter by Status',
		name: 'filter_by_status',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Active',
				value: 'active',
				description: 'Experiment is running',
			},
			{
				name: 'All',
				value: '',
			},
			{
				name: 'Archived',
				value: 'archived',
				description: 'Experiment is archived',
			},
			{
				name: 'Initial',
				value: 'initial',
				description: 'Experiment is in initial state',
			},
			{
				name: 'Paused',
				value: 'paused',
				description: 'Experiment is paused',
			},
			{
				name: 'QA',
				value: 'qa',
				description: 'Experiment is in QA testing',
			},
		],
		default: '',
		description: 'Filter experiments by status',
	},
	{
		displayName: 'Filter by Name',
		name: 'filter_by_name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'Filter experiments by name (partial match)',
		placeholder: 'Homepage Test',
	},
	{
		displayName: 'Order By',
		name: 'order_by',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Created At',
				value: 'created_at',
			},
			{
				name: 'Updated At',
				value: 'updated_at',
			},
			{
				name: 'Name',
				value: 'name',
			},
			{
				name: 'Status',
				value: 'status',
			},
		],
		default: 'created_at',
		description: 'Field to order results by',
	},
	{
		displayName: 'Order Direction',
		name: 'order_direction',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Ascending',
				value: 'asc',
			},
			{
				name: 'Descending',
				value: 'desc',
			},
		],
		default: 'desc',
		description: 'Direction to order results',
	},
];

/**
 * Experiment creation parameters
 */
export const createExperimentParameters: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the experiment',
		placeholder: 'Homepage Hero Test',
	},
	{
		displayName: 'Page URL',
		name: 'pageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The URL of the page where the experiment will run',
		placeholder: 'https://example.com/homepage',
	},
	{
		displayName: 'Page Name',
		name: 'pageName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Optional name for the page',
		placeholder: 'Homepage',
	},
	{
		displayName: 'Tracking Enabled',
		name: 'tracking_enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: true,
		description: 'Whether tracking is enabled for this experiment',
	},
	{
		displayName: 'Variations',
		name: 'variations',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default:
			'[\n  {\n    "name": "Control",\n    "traffic_allocation": 50\n  },\n  {\n    "name": "Variation A",\n    "traffic_allocation": 50,\n    "javascript": "console.log(\'Variation A\');",\n    "javascript_reset": "console.log(\'Reset\');",\n    "css": ".hero { background: blue; }",\n    "extensions": [],\n    "changesets": [],\n    "redirect_url": "https://example.com/variant",\n    "ga4_audience_id": "aud_123"\n  }\n]',
		description:
			'Array of variations. Required: name, traffic_allocation (0-100). Optional: javascript, javascript_reset, css, extensions (array), changesets (array), redirect_url (max 255 chars), ga4_audience_id (max 255 chars).',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Audience Targeting',
		name: 'audience_targeting',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: '',
		description:
			'Optional audience targeting rules as nested array structure. Example: [[{"type": "device", "operator": "equals", "value": "desktop"}]].',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Page Targeting',
		name: 'page_targeting',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['create'],
			},
		},
		default: '',
		description:
			'Optional page targeting rules as nested array structure. Example: [[{"type": "URL", "operator": "contains", "value": "/products"}]].',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
];

/**
 * Experiment update parameters
 */
export const updateExperimentParameters: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The new name for the experiment (leave empty to keep current)',
		placeholder: 'Updated Experiment Name',
	},
	{
		displayName: 'Page URL',
		name: 'page_url',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Updated page URL where the experiment will run (leave empty to keep current)',
		placeholder: 'https://example.com/homepage',
	},
	{
		displayName: 'Page Name',
		name: 'page_name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Updated page name (leave empty to keep current)',
		placeholder: 'Homepage',
	},
	{
		displayName: 'Tracking Enabled',
		name: 'tracking_enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: true,
		description: 'Whether tracking is enabled for this experiment',
	},
	{
		displayName: 'GA4 Audience ID',
		name: 'ga4_audience_id',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Google Analytics 4 audience ID for this experiment',
		placeholder: 'aud_123abc',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		options: [
			{
				name: 'Active',
				value: 'active',
				description: 'Experiment is running',
			},
			{
				name: 'Archived',
				value: 'archived',
				description: 'Experiment is archived',
			},
			{
				name: 'Initial',
				value: 'initial',
				description: 'Experiment is in initial state',
			},
			{
				name: 'Paused',
				value: 'paused',
				description: 'Experiment is paused',
			},
			{
				name: 'QA',
				value: 'qa',
				description: 'Experiment is in QA testing',
			},
		],
		default: 'initial',
		description: 'Updated experiment status (leave empty to keep current)',
	},
	{
		displayName: 'Scheduled Start Date',
		name: 'scheduled_start_date',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: '2024-02-01',
		description: 'Scheduled start date in YYYY-MM-DD format (leave empty to keep current)',
	},
	{
		displayName: 'Scheduled End Date',
		name: 'scheduled_end_date',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: '2024-03-01',
		description: 'Scheduled end date in YYYY-MM-DD format (leave empty to keep current)',
	},
	{
		displayName: 'Scheduled Timezone',
		name: 'scheduled_timezone',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: 'America/New_York',
		description:
			'Timezone for scheduled dates (e.g., America/New_York, Europe/Berlin) (leave empty to keep current)',
	},
	{
		displayName: 'Variations',
		name: 'variations',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description:
			'Update or create variations. Include ID to update existing, omit ID to create new.',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Audience Targeting',
		name: 'audience_targeting',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description:
			'Updated audience targeting rules as nested array structure. Example: [[{"type": "device", "operator": "equals", "value": "desktop"}]].',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Page Targeting',
		name: 'page_targeting',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['experiment'],
				operation: ['update'],
			},
		},
		default: '',
		description:
			'Updated page targeting rules as nested array structure. Example: [[{"type": "URL", "operator": "contains", "value": "/products"}]].',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
];

/**
 * Status update parameter
 */
export const statusParameter: INodeProperties = {
	displayName: 'Status',
	name: 'status',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['experiment'],
			operation: ['updateStatus'],
		},
	},
	options: [
		{
			name: 'Active',
			value: 'active',
			description: 'Experiment is running',
		},
		{
			name: 'Archived',
			value: 'archived',
			description: 'Experiment is archived',
		},
		{
			name: 'Initial',
			value: 'initial',
			description: 'Experiment is in initial state',
		},
		{
			name: 'Paused',
			value: 'paused',
			description: 'Experiment is paused',
		},
		{
			name: 'QA',
			value: 'qa',
			description: 'Experiment is in QA testing',
		},
	],
	default: 'initial',
	description: 'The new status for the experiment',
};

/**
 * Traffic allocation parameter for updateTrafficAllocation operation
 */
export const trafficAllocationParameter: INodeProperties = {
	displayName: 'Variations',
	name: 'variations',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['experiment'],
			operation: ['updateTrafficAllocation'],
		},
	},
	default:
		'[\n  {\n    "id": 123,\n    "traffic_allocation": 60\n  },\n  {\n    "id": 456,\n    "traffic_allocation": 40\n  }\n]',
	description:
		'Array of variations with updated traffic allocation. Each variation must have an ID (number) and traffic_allocation (0-100). Total must not exceed 100%.',
	typeOptions: {
		alwaysOpenEditWindow: true,
	},
};

/**
 * Report parameters for all report operations
 */
export const reportParameters: INodeProperties[] = [
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport', 'getDailyReport', 'getRawRevenueReport'],
			},
		},
		default: '',
		placeholder: '2024-01-01',
		description: 'Start date for report data in YYYY-MM-DD format',
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport', 'getDailyReport', 'getRawRevenueReport'],
			},
		},
		default: '',
		placeholder: '2024-01-31',
		description: 'End date for report data in YYYY-MM-DD format',
	},
	{
		displayName: 'Report Type',
		name: 'report_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport', 'getDailyReport', 'getRawRevenueReport'],
			},
		},
		options: [
			{
				name: 'Google Analytics 4',
				value: 'ga4',
				description: 'Use Google Analytics 4 as the data source',
			},
			{
				name: 'PostHog',
				value: 'posthog',
				description: 'Use PostHog as the data source',
			},
		],
		default: 'ga4',
		description: 'Analytics provider to use for report data',
	},
	{
		displayName: 'Exclude Duplicate Events',
		name: 'should_exclude_duplicate_user_events',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport', 'getDailyReport', 'getRawRevenueReport'],
			},
		},
		default: false,
		description: 'Whether to exclude duplicate user events from the report',
	},
	{
		displayName: 'Raw Data',
		name: 'raw_data',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport', 'getRawRevenueReport'],
			},
		},
		default: false,
		description: 'Whether raw data should be returned, instead of formatted report',
	},
];

/**
 * All experiment parameters combined
 */
export const experimentParameters: INodeProperties[] = [
	experimentIdParameter,
	...paginationParameters,
	...filteringParameters,
	...createExperimentParameters,
	...updateExperimentParameters,
	statusParameter,
	trafficAllocationParameter,
	...reportParameters,
];
