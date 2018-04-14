import { high } from '../../src';
const { Refer } = high;

export default function(refcode, config = {}) {
	switch (refcode) {
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
					// queryTreeUrl={'/ncdemo-web/bd/basedoc/refregion.do'}
					queryTreeUrl={'/ncdemo-web/bd/basedoc/refcounty.do'}
					{...config}
				/>
			);
	}
}
