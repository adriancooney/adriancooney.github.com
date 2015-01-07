---
layout: post
title: Bezier Interpolation
subtitle: It's really not that hard.
synopsis: After becoming frustrated with Apple's SpriteKit and it's lack of features, I decided to go all out and implement the missing features myself. Of these features, the most fun was overly complicated bezier interpolation.
banner: /assets/image/posts/bezier-interpolation/Cover.jpg
banner_attribution: 
  text: Elise Blaha
  link: http://eliseblaha.typepad.com/golden/2011/04/project-5-of-26-a-decorative-ampersand.html
---


<p>After becoming frustrated with Apple's SpriteKit and it's lack of features, I decided to go all out and implement the missing ones myself. One of these features Apple “forgot” to implement (or half-assedly implemented )was easing on their animations. When my needs eventually called for easing along a specific path, I was flat out of luck. Although easing in itself is relatively easy to implement when moving objects from A to B in a straight line, moving along a curve is another story entirely. So I set out to learn about bezier curves. It's wasn't a particularly fun task because most of the online resources were either to verbose or just showed unhelpful snippets of code with loads of tiny, unlabeled variables. Then, which should have been my first stop, I stumbled on <a target="_blank" href="http://en.wikipedia.org/wiki/B%C3%A9zier_curve" rel="nofollow">Bezier Curves on Wikipedia</a> and it all clicked when I hit this gif.</p>

<figure class="small">
    <img src="/assets/image/posts/bezier-interpolation/1*RdNctOG0RlAfzvrAez2rVQ.gif">
    <figcaption>Bezier curve animation. Whoever makes these gifs, I love you.</figcaption>
</figure>

<p>This is a cubic bezier curve. A cubic bezier curve is, in essence, four points. <em>Po </em>is the start point, <em>P1</em> and <em>P2</em> are control points 1 &amp; 2 and <em>P3</em> is the end point. The start and end point denote the beginning and end points of the path and the control points dictate how the path moves from the start to the finish. As you can see from the gif, the only variable changing is <em>t</em> which denotes how far the path has progressed from <em>P0</em> to <em>P3</em> (think percent).</p>
<p>Take a look at how the green point moves along the line <em>P0</em> to <em>P1</em>. All it's doing is moving from A to B, linearly, with T. To get this point at T on P0 to P1, we'll create a function called <em>pointInLine. </em>This function takes in three parameters, point A the start of a line, point B the end of a line and percent T. It returns the point at T between A and B.</p>

```c
CGPoint pointInLine(CGPoint A, CGPoint B, float T) {
    CGPoint C;
	C.x = A.x - ((A.x - B.x) * T);
	C.y = A.y - ((A.y - B.y) * T);
	return C;
}
```
<figure class="right">
    <img src="/assets/image/posts/bezier-interpolation/1*R2GfQ03RUHAaybNwnjJ-HQ.png">
</figure>
<p>The formula in this function is the same for each axis. It get's the length of the line (on each axis respectively) by taking A - B and multiplies it by the percent T (between 0-1). It then adds the new, shortened line segment back onto the original point A to get a new point C. This function is the basis of all our calculations.</p>

<p>Let's take a look at our gif again, except freeze it on this specific frame stopped at <em>t = 50</em>.</p>

<figure class="small">
    <img src="/assets/image/posts/bezier-interpolation/1*sjqkXkKxHcA7pCavwXgX2g.png">
</figure>

<p>I've marked where the algorithm is getting the points at <em>T = 50</em> on each line. <em>a </em>is on the line <em>p0-p1, b</em> is on the line <em>p1-p2</em>, <em>c</em> is on the line <em>p2-p3</em>. Let's get <em>a, b </em>and<em> c </em>using our <em>pointInLine</em> function from earlier at <em>T = 0.50.</em></p>

```c
float T = 0.50;
CGPoint A = pointInLine(p0, p1, T);
CGPoint B = pointInLine(p1, p2, T);
CGPoint C = pointInLine(p2, p3, T);
```
<p>Moving further, we get <em>d </em>and <em>e </em>using the same method as above with instead of <em>p0, p1, p2 </em>and<em> p3</em>, we use <em>a, b </em>and <em>c.</em></p>

<figure class="small">
    <img src="/assets/image/posts/bezier-interpolation/1*5qOylkuinPYCEMWWYgcPxQ.png">
</figure>

```c
float T = 0.5;
CGPoint A = pointInLine(p0, p1, T);
CGPoint B = pointInLine(p1, p2, T);
CGPoint C = pointInLine(p2, p3, T);
CGPoint D = pointInLine(A, B, T); // The new D
CGPoint E = pointInLine(B, C, T); // and E
```
<p>Now were down to our last point, <em>f</em>, which is the actual point on the curve. The one were looking for.</p>

<figure class="small">
    <img src="/assets/image/posts/bezier-interpolation/1*8Kkf6KiQtmtwMcRmll6lPA.png">
</figure>

```c
float T = 0.5;
CGPoint A = pointInLine(p0, p1, T);
CGPoint B = pointInLine(p1, p2, T);
CGPoint C = pointInLine(p2, p3, T);
CGPoint D = pointInLine(A, B, T);
CGPoint E = pointInLine(B, C, T);
CGPoint F = pointInLine(D, E, T); // The juicy one
```
<p>All that's left now is to generate the curve of all points. Of course it's not possible to generate <em>all</em> the points but what you can do is generate enough to generate a smooth curve.</p>

```c
// Get 100 points
for(CGFloat T = 0; T &lt; 1; T += 0.01) {
	CGPoint A = pointInLine(p0, p1, T);
	CGPoint B = pointInLine(p1, p2, T);
	CGPoint C = pointInLine(p2, p3, T);
	CGPoint D = pointInLine(A, B, T);
	CGPoint E = pointInLine(B, C, T);
	CGPoint F = pointInLine(D, E, T);
	drawPoint(F); // And draw the point on the screen
}
```
<p>And there we go, a cubic bezier curve. What about quad curves, the 2nd degree bezier curve? Quad curves are simply half a bezier curve. Instead of 2 control points, we have one. A quad curve can be generated by drawing the change in position of percent T along line A-C.</p>

```c
// We have 3 points
CGPoint p0, p1, p2;
CGPoint A = pointInLine(p0, p1, T);
CGPoint B = pointInLine(p1, p2, T);
CGPoint D = pointInLine(A, B, T); // The point in the quad curve
```
<p>Notice anything interesting here? The exact code for generating a point on the quad curve exists in the cubic curve. Let's break it up even further.</p>

```c
CGPoint pointInQuadCurve(CGPoint p0, CGPoint p1, CGPoint p2) {
	CGPoint A = pointInLine(p0, p1, T);
	CGPoint B = pointInLine(p1, p2, T);
	return pointInLine(A, B, T); // The point in the quad curve
}
```

<p>Now use this in our cubic curve, since a cubic curve is made up of two quad curves.</p>

```c
CGPoint pointInCubicCurve(CGPoint p0, CGPoint p1, 
	    CGPoint p2, CGPoint p3) {
	CGPoint A = pointInQuadCurve(p0, p1, p2);
	CGPoint B = pointInQuadCurve(p1, p2, p3);
	return pointInLine(A, B, T);
}
```
<p>How about a quintic curve?</p>

```c
CGPoint pointInQuinticCurve(CGPoint p0, CGPoint p1, CGPoint p2,
	    CGPoint p3, CGPoint p4) {
	CGPoint A = pointInQuadCurve(p0, p1, p2, p3);
	CGPoint B = pointInQuadCurve(p1, p2, p3, p4);
	return pointInLine(A, B, T);
}
```
<p>You should have noticed by now the recurring pattern in the curve generation. You use the nth-1 degree function twice and then find the point in the line at T to get the nth degree curve point. Quintic is probably the most you'll ever need, if ever need it.</p>

<p>Hope you enjoyed my fairly informal and (probably too) detailed introduction to bezier curves. Have fun drawing your curves! The above code is implemented in my <a target="_blank" href="http://github.com/adriancooney/SKMech" rel="nofollow">SKMech Spritekit utility library</a>, if you were wondering.</p>