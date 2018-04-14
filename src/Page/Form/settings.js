/**
 * 两列布局col取值为6 
 * 三列布局col取值为4
 * 
 */

const Layout = {
	3: {
		label: 1,
		control: 2
	},
	4: {
		label: 1,
		control: 3
	},
	6: {
		label: 2,
		control: 4
	},
	12: {
		label: 1,
		control: 11
	}
};

const Layout4 = {
	3: {
		label: 0,
		control: 3
	},
	4: {
		label: 0,
		control: 4
	},
	6: {
		label: 0,
		control: 6
	},
	12: {
		label: 0,
		control: 12
	}
};

const Settings = {
	Layout,
	Layout4
};

export default Settings;
