import { high } from '../../../src';
const { Refer } = high;
export default function(refcode, config = {}) {
	switch (refcode) {
		case 'country':
			return (
				<Refer
					refName={'国家地区'}
					refCode={'country'}
					queryGridUrl={'/ncdemo-web/bd/basedoc/refcounty.do'}
					{...config}
				/>
			);
		case 'region':
			return (
				<Refer
					refName={'行政区划'}
					refCode={'region'}
					refType={'tree'}
					queryTreeUrl={'/ncdemo-web/bd/basedoc/refregion.do'}
					{...config}
				/>
			);
	}
}
