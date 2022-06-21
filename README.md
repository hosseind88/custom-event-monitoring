# Custom Event Monitoring

this is an devtools extention that let's you monitor events that you dispatch by ```document.dispatchEvent```

in main page you can add your listener events. f.e you want to dispatch an event like this:
```
document.dispatchEvent(new CustomEvent('KEY_A', {
  detail: {
    name: 'some data'
  }
}));
```
you should add ```KEY_A``` and hit confirm.

![Screen Shot 2022-06-21 at 13 34 15](https://user-images.githubusercontent.com/72156162/174761927-fc02be1b-5547-4325-8792-024d3380bc1e.png)

then you see this page:

![Screen Shot 2022-06-21 at 13 38 25](https://user-images.githubusercontent.com/72156162/174762513-3a8c1544-cf1d-4803-bc6b-d4b4d99de4c2.png)

now you can dispatch your events. let's dispatch above event that we said about.
now you will see this:

![Screen Shot 2022-06-21 at 13 41 15](https://user-images.githubusercontent.com/72156162/174763157-a5daff46-f01d-42af-aec7-679ab46e6e69.png)

tada 🎉.

and also you can click on event buttons and filter events you see. or click on back button and edit the events you defined.
