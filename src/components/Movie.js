import React from 'react';

const Movie = (props) => {
    const shorten = (text,max) => {
        return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') + '...' : text
    }

    const image = (img) => {
        if(img){
            return `https://image.tmdb.org/t/p/w220_and_h330_face${img}`;
        }else{
            return `https://dummyimage.com/220x330/dbdbdb/030303.jpg&text=No+Image`;
        }
    }

	return (
        <div className="row">
        {props.rows.map((row,idx) => {
            return (
				<div key={`card${idx}${row.id}`} className="col-lg-3 col-md-3 mb-4">
					<div className="card h-100">
						<a href="#" onClick={(e) => {
							e.preventDefault();
							props.viewMovieInfo(row.id);
						}}>
							<img className="card-img-top" src={image(row.poster_path)} alt="" />
						</a>
						<div className="card-body">
							<div className="card-title">
								<div className="row">
									<div className="col-md-8">
										<h5>{row.title}</h5>
									</div>
									<div
										style={{
											textAlign: 'right',
											fontSize: 14,
											paddingTop: 3,
										}}
										className="col-md-4"
									>
										{row.vote_average}
									</div>
								</div>
							</div>

							<p className="card-text">{shorten(row.overview, 50)}</p>
						</div>
					</div>
				</div>
			);
        })}
        </div>
	);
};

export default Movie;
