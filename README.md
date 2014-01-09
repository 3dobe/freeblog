# freeblog

A lightweight blog framework

## Base

We use Node and MongoDB

## Install and Run

1. Download this package

	```shell
	cd freeblog
	```

1. Install dependencies

	```shell
	npm install
	```

1. Copy a `config` from `config.example`<br>
	Modify some configuration inside as you need

	```shell
	cp -r config.example config
	```

	*NOTICE: You should update the `admin` information*

1. Initialize database

	```shell
	node setup
	```

1. Run it

	```shell
	node app
	```

	And then visit `http://localhost:8008`

## Administration

Visit `http://localhost:8008/admin`<br>
Post a request just with the form

Available REST API:
- Posts [ title, body ]
	- POST `/api/posts`
	- PUT `/api/posts/:postid`
	- DELETE `/api/posts/:postid`
- Posts - Comment [ name, body ]
	- POST `/api/posts/:postid/comments`
	- PUT `/api/posts/:postid/comments/:commentid`
	- DELETE `/api/posts/:postid/:commentid`
- Albums [ title ]
	- POST `/api/albums`
	- PUT `/api/albums/:albumid`
	- DELETE `/api/albums/:albumid`
- Album - Pictures [ image(file), desc ]
	- POST `/api/albums/:albumid/pictures`
	- PUT `/api/albums/:albumid/pictures/:pictureid`
	- DELETE `/api/albums/:albumid/pictures/:pictureid`
