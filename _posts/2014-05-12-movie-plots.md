---
layout: post
name: movie-plots
title: Movie plots, literally.
subtitle: Let's try graph cinematography.
synopsis: So Apple has radically changed the look of iOS to align itself with the "flat" design trend. This post explores my initial thoughts on booting up iOS7.
banner: /assets/image/posts/movie-plots/Cover.png
---

<p>So recently I became intrigued with the audio waveform, the spiky bar you see on sites like SoundCloud, of some my favorite songs. It's a beautiful, raw depiction of music. It's gives you a quick and powerful insight into the sound. After an all night film binge on Netflix, I decided in a tired, popcorned haze to plot films in a similar manner. Instead of audio frequencies, the color profiles of select frames throughout the film would make for an interesting substitute. It was understood previous that no discernable insight could be made from the output, but pretty graphs you can hang on the wall. To just see the graphs, skip the below (I know that's what I would do).</p>

<h4>Getting the data</h4>
<p>Extracting the data was done through <em>ffmpeg</em> and Node.js, a decision I later regretted because there was <em>much better</em> APIs in other languages. However, I mustered on and developed a quick, <em>streaming</em> interface with <em>ffmpeg. </em>Once the script was together, I scraped through my (small) local film library of my favourites (and Scott Pilgrim vs the World), saved the color data and moved onto plotting.</p>

<h4>Plotting the data</h4>
<p>This bit was fun. Utilizing the extremely handy <em>node-canvas</em>, all the drawing is done with the brower's canvas API but with node. Once the grapher is created, each film is plugged into it and spit out into a folder, automatically. It's pretty sweet seeing them all fly out in their colorful way.</p>

<h4>The Graphs</h4>
<p>After some playful experimentation with different graphers, I found the waveform brightness graphs to be pretty much the most useless out of the three I produced. They showed barely any information about the film but I included them anyway because they look sorta cool. The most striking graphs were the "movie discs", as I like to call them. You can quickly see the main color scheme and dark/light points in the film. The beginning of the film is the outer ring and time continues inward. After the discs, you can see the the barcode graphs which are similar to the discs but with time progressing horizontally.</p>

<figure class="full">
    <img src="/assets/image/posts/movie-plots/1*JuzAxl4jjRuXEzWEL-07kg.jpeg">
    <figcaption>Film "discs"</figcaption>
</figure>

<figure class="full">
    <img src="/assets/image/posts/movie-plots/1*QxvYEeW6iGSspJoTt8COXA.jpeg">
    <figcaption>Film "barcodes"</figcaption>
</figure>

<figure class="full">
    <img src="/assets/image/posts/movie-plots/1*YPRqN4XC8D_plIZspiDI2w.jpeg">
    <figcaption>Film "waveforms"</figcaption>
</figure>

<h4>Thanks for reading</h4>
<p>The code used to generate the data, plot the results and all the individual graphs are available <a target="_blank" href="http://github.com/adriancooney/movie-plots" rel="nofollow">here on Github</a>. There was a ton more films I wanted to graph but I just don't have the internet connection or bandwidth to do it. Feel free to try it out at home with your favourites and submit a pull request.</p>