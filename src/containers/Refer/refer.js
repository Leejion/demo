import Refer from './index.js';

export default function(refcode, config = {}) {
	switch (refcode) {
		case 'obligation':
			return (
				<Refer
					refName={'履约义务档案'}
					refCode={'obligation'}
					queryGridUrl={'/nccloud/reva/ref/obligation.do'}
					refType={'grid'}
					{...config}
				/>
			);
		case 'dept':
			return (
				<Refer
					refName={'部门'}
					refCode={'dept'}
					queryTreeUrl={'/nccloud/reva/ref/dept.do'}
					refType={'tree'}
					{...config}
				/>
			);
		case 'material':
			return (
				<Refer
					refName={'物料'}
					refCode={'material'}
					queryTreeUrl={'/nccloud/reva/ref/materialclass.do'}
					queryGridUrl={'/nccloud/reva/ref/material.do'}
					refType={'gridTree'}
					isMultiSelectedEnabled={true}
					{...config}
				/>
			);
	}
}
