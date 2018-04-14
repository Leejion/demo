import { ajax } from '../../../../src';

export default function buttonClick(props, id) {
	switch (id) {
		case 'addButton':
			props.table.openModel('pobdoc', 'add');
			break;
	}
}
