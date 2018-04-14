import { high } from '../../../../src';
const { Refer } = high;
export default function(refcode, config) {
	console.log(config);
	switch (refcode) {
		case 'pk_org':
			return (
				<Refer
					refName={'财务组织'}
					refCode={'pk_org'}
					queryGridUrl={'/ncdemo-web/bd/basedoc/reffinanceorg.do'} //财务组织的后台参照
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
