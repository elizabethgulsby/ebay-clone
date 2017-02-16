import React, { Component } from 'react';

class CurrentItems extends Component {
	render() {
		return (
			<div className="container">
				<div className="row current-items">
					Trending items go here
				</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/140x100" />
							</div>
						</div>
					</div>
			</div>
		)
	}
}

export default CurrentItems;