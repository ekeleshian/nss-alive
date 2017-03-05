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

You'll need to have `Python` installed, we are using
`Python3`. Assuming you are on `Debian` based distribution, aka
`Debian` or `Ubuntu`, then you do:

```
$ sudo aptitude install python3-pip -y
```

Then I recommend you update `pip3` itself with `pip3 install --upgrade pip`

To install the `Python` requirements, you'll need to run `$ npm run pyrequire`
