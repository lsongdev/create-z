## create-z

> Universal Project Scaffold Tools

> /ˈkreɪzi/

### Install

```sh
~$ npm i -g create-z
```

### How to use?

First, create template files in your project:

```sh
~$ mkdir -p templates/page
~$ echo "hello world" >> templates/page/index.js.hbs
```

Then,

```sh
~$ create-z page
[O] ~/Projects/my-project/index.js
```

You will see them ...

```sh
~$ cat ~/Projects/my-project/index.js
hello world
```

**Ask Questions**

```sh
~$ $EDITOR templates/page/index.js.hbs
```

```patch
+ ---
+ questions:
+   - type: input
+     name: name
+     message: Please input your page name:
+ ---
- hello world
+ hello {{{name}}}
```

```sh
~$ create-z page
Please input your page name: mypage
[O] ~/Projects/my-project/index.js
```
Then ...


```sh
~$ cat ~/Projects/my-project/index.js
hello mypage
```
