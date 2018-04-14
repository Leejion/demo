import { high } from '../../../src';
const { Refer } = high;

export default function(refcode, config = {}) {
	switch (refcode) {
		case 'pk_org':
			return (
				<Refer refName={'财务组织'} refCode={'pk_org'} queryGridUrl={'/nccloud/reva/ref/finance.do'} {...config} />
			);
		case 'materiel':
			return (
				<Refer
					refName={'物料'}
					refCode={'materiel'}
					queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
					queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
					{...config}
				/>
			);
		case 'bank':
			return (
				<Refer
					refName={'银行'}
					refCode={'bank'}
					queryGridUrl={'/ncdemo-web/bd/basedoc/refcounty.do'}
					queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
					{...config}
				/>
			);
	}
}
