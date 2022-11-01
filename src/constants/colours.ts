const c1 = {
	blue: ['#016EB7', '#0175C0', '#0186DF'],
	red: ['#DB1A1A', '#E52323', '#E73636'],
	yellow: ['#F4AB01', '#FAB001', '#FEBB20'],
	green: ['#008F3C', '#00973F', '#00B84D'],
	black: ['#000000'],
	bronze: ['#AE9456'],
};

export const rawColours = Object.freeze({
	blue: '#016EB7',
	red: '#E52323',
	yellow: '#F4AB01',
	green: '#00973F',
} as const);

export const mappedColours: Readonly<Record<string, keyof typeof rawColours>> = Object.freeze({
	countries: 'blue',
	sports: 'red',
	yellow: 'yellow',
	games: 'green',
} as const);

const colourKeys = ['olympic-blue', 'olympic-red', 'olympic-yellow', 'olympic-green'] as const;

export const colours = {
	'olympic-blue': [
		'#95B0C1',
		'#7BA2BC',
		'#5F97BB',
		'#408EC1',
		'#2B85BF',
		'#167CBE',
		'#0175C0',
		'#12669C',
		'#1D5980',
		'#234E6A',
		'#264559',
		'#273D4B',
		'#263641',
	],
	'olympic-red': [
		'#EEE5E5',
		'#E0CACA',
		'#D5ADAD',
		'#D09090',
		'#D07070',
		'#D64C4C',
		'#E52323',
		'#C22C2C',
		'#A13535',
		'#873939',
		'#733B3B',
		'#623A3A',
		'#553838',
	],
	'olympic-yellow': [
		'#E7E2D6',
		'#DBD1B9',
		'#D5C39B',
		'#D4B97A',
		'#D9B256',
		'#E7B02D',
		'#FAB001',
		'#CB9517',
		'#A68025',
		'#8A6E2D',
		'#746031',
		'#625432',
		'#544A31',
	],
	'olympic-green': [
		'#66A680',
		'#52A173',
		'#419C67',
		'#31985C',
		'#219652',
		'#119548',
		'#00973F',
		'#0E7A3B',
		'#166437',
		'#1B5332',
		'#1D462E',
		'#1E3B2A',
		'#1E3326',
	],
};
