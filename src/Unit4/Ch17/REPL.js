const mongoose = require( 'mongoose' ), Subscriber = require( './models/subscriber' ), Course = require( './models/course' );
mongoose.connect('mongodb://localhost:27017/recipe_db', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var subscriber;

Subscriber.findOne({ name: 'Mauro' }).then( function(result) { subscriber = result; console.log(subscriber.getInfo()); });

var testCourse, testSubscriber;

Course.create({ title: 'Tomato Land', description: 'Locally farmed tomatoes only', zipCode: '1234AB', items: ['cherry', 'heirloom'] }).then(course => testCourse = course);
 
Subscriber.findOne({}).then( subscriber => testSubscriber = subscriber );
 
testSubscriber.courses.push( testCourse );
testSubscriber.save();
Subscriber.populate( testSubscriber, 'courses' ).then( subscriber => console.log( subscriber ) );
