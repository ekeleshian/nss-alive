*nss alive*
-----------

This is an ambitious project to project a wrapper layer on top of the
Armenian NSS data sources. We use Python to download all the data that
the NSS provides, clean it up and store it in our sqlite database,
then with that data we expose it to a beautiful front end with React,
d3.


Building
--------

# Setting up the project for first time

## Python

You'll need to have `Python` installed, we are using
`Python3`. Assuming you are on `Debian` based distribution, aka
`Debian` or `Ubuntu`, then you do:

```
$ sudo aptitude install python3-pip -y
```

Then I recommend you update `pip3` itself with `pip3 install --upgrade pip`

To install the `Python` requirements, you'll need to run `$ npm run
pyrequire`. If you look in the `requirements.txt` file you'll see two
pacakges, one is `requests`, we will use that for `HTTP` requests and
the other is `xlrd`, this is a package to read and handle `Excel`
files. 

## node

Now you need to have the `node` part of the project working, for that
just do

```shell
$ npm install
```

Developing
----------

If you're working on the `JavaScript` part of the project, then you
need to open a shell and just run `npm run watch`, and that will:

1. Restart the server when there's a change in backend code. 
2. Recompile the front end code whenever there is a `JSX` change. 
3. Bundle the code up for the front end


