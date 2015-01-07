---
layout: post
name: understanding-this
title: Understanding 'this'.
subtitle: My take on the infamously hard concept to grasp.
synopsis: I remember the days trying to grasp the concept of <em>this</em> in Javascript when I first delved into Object Oriented Programming (OOP). Admittedly, it did take me quite a while to wrap my head around the concept.
---

<p>I remember the days trying to grasp the concept of <em>this</em> in Javascript when I first delved into Object Oriented Programming (OOP). Admittedly, it did take me quite a while to wrap my head around the concept but I felt as though it was attributed to the reading material rather than my own learning ability. I finally understood it when I realized I had already learned the concept many years ago, just not in a <em>programming context </em>but in linguistics<em>. </em>We all understand <em>this</em>, it's just bridging the gap that's hard. The following post uses Javascript but the samples used are extremely basic and can be applied to all OOP languages (such as Python or Java).</p>

<p>Let's start of with a simple example.</p>

<blockquote>Dave has a car.<br>Dave's car is <strong>red</strong>.<br>Dave's car has <strong>2 seats</strong>.<br>Dave's car is a <strong>Mercedes</strong>.<br>Dave's car has <strong>6 gears</strong>.<br>Dave's car can reach <strong>60mph in 4.0 seconds.</strong></blockquote>

<p>Here we have our first object, Dave's car (Dave drives a nice car). Notice anything odd about the above paragraph? We mention "Dave" <em>six </em>times in that paragraph. We should only need to mention his name once, context and common sense should do the rest.</p>

<blockquote>Dave has a car.<br>This car is <strong>red.<br> </strong>This car has <strong>2 seats. </strong><br>This car is a <strong>Mercedes. </strong><br>This car has <strong>6 gears. </strong><br>This car can reach <strong>60mph in 4.0 seconds.</strong></blockquote>

<p><em>this</em> is <strong>context</strong>. That's all it is. In this example, it simply refers to Dave's car. If we wanted to describe Matt's car, which coincidentally is the exact same type of car as Dave's, all we would need to do is change "Dave" to "Matt" in the first sentence and the entire rest of the paragraph switches context from Dave's car to Matt's car.</p>

<p>Let's take a look at some code for the above examples. Let's create two cars, Dave's and his friend, Kevin's. Let's take a look at how we would do it if we were to go by the original <strong>bad</strong> example above.</p>

```js
function createDavesCar() {
    var davesCar = {};
    davesCar.color = "red";
    davesCar.seats = 2;
    davesCar.brand = "Mercedes";
    davesCar.gears = 6;
    davesCar.zeroTo60 = 4.0;
    return davesCar;
}

function createKevinsCar() {
    var kevinsCar = {};
    kevinsCar.color = "green";
    kevinsCar.seats = 4;
    kevinsCar.brand = "Audi";
    kevinsCar.gears = 5;
	kevinsCar.zeroTo60 = 8.0;
	
	return kevinsCar;
}

var davesCar = createDavesCar();
var kevinsCar = createKevinsCar();
```

<p>Seems very long winded, right? Look at all that extra code that only changes <em>dave</em> to <em>kevin </em>and some values.</p>

<h4>Enter context and <em>this.</em></h4>
<p>Let's create a Car class:</p>

```js
var Car = function(color, seats, brand, gears, zeroTo60) {
    this.color = color;
	this.seats = seats;
	this.brand = brand;
	this.gears = gears;
	this.zeroTo60 = zeroTo60;
};
```
<p>When the above function is used in conjunction with the <em>new</em> keyword (as we'll see in the following example), it creates a new object in the background and replaces any occurrence of <em>this</em> with a reference to the newly created object. Any attributes added to <em>this</em> will be proxied or pushed onto the new, behind the scenes object. This is a feature of the language that allows you to abstract away from explicitly referencing objects by name and constantly repeating yourself to dynamically adding attributes or properties to multiple objects using the same code. Let's create Dave and Kevin's cars now.</p>

```js
var davesCar = new Car("red", 2, "Mercedes", 6, 4.0);
var kevinsCar = new Car("green", 4, "Audi", 5, 8.0);
```

<p>Now we two completely different cards generated, called <em>instances</em>, from the same code. Once you have this concept nailed down, the real power of OOP is ready to be unleashed. You define your methods context-free then invoke or call these methods with these objects as it's context. Let's do an example on the Car class. Say we wanted to generate a For Sale advert based on the cars details.</p>

```js
Car.prototype.sell = function() {
	return "For sale: " + this.brand + ", "+ this.color + "." +
        "0-60 in " + this.zeroTo60 + "seconds.";
};

davesCar.sell(); //"For Sale: Mercedes, red. 0-60 in 4 seconds."
```

<p>The above code creates a member function <em>sell</em> onto the Car class. It can be called on any instance of Car and can generate an advert based on current context, or car i.e. <em>this</em>. Member functions can call other member functions from <em>this</em>, they can set create properties too just as you&#39;d expect.</p>
<p>And that's <em>this</em> in a nutshell. It's a pretty placeholder for the context to be switched within functions, nothing more.</p>