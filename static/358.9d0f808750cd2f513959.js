(self.webpackChunk_pwrc_static_blog_example=self.webpackChunk_pwrc_static_blog_example||[]).push([[358,216,882],{5:(l,i,n)=>{var e={"./2020-12-28--first-post.md":216,"./2020-12-29--second-post.md":882};function s(t){var a=o(t);return n(a)}function o(t){if(!n.o(e,t)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e[t]}s.keys=function(){return Object.keys(e)},s.resolve=o,l.exports=s,s.id=5},976:(l,i,n)=>{"use strict";n.d(i,{Z:()=>e});const e={hero:{title:"Blog Example",details:"A simple blog built on @PWRC."}}},899:(l,i,n)=>{"use strict";n.d(i,{Z:()=>t});var e=n(784),s=n.n(e);function o({title:a,details:p}){return e.createElement("div",{className:"py-0 md:py-2"},e.createElement("div",{className:"relative my-9"},e.createElement("div",{className:"absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"}),e.createElement("div",{className:"relative bg-white shadow-lg sm:rounded-3xl"},e.createElement("div",{className:"px-6 sm:px-12 lg:px-20 py-6"},e.createElement("div",{className:"lg:2/6 mt-20 lg:ml-16 text-left mb-20"},e.createElement("div",{className:"text-6xl font-semibold text-gray-900 leading-none"},a),p?e.createElement("div",{className:"mt-6 text-xl font-light text-true-gray-500 antialiased"},p):null)))))}const t=o},312:(l,i,n)=>{"use strict";n.r(i),n.d(i,{default:()=>P});var e=n(784),s=n(517),o=n(175),t=n(875),a=n(294),p=n(899);function k({post:r}){return e.createElement(e.Fragment,null,e.createElement(o.q,{htmlAttributes:{lang:"en-us"}},e.createElement("title",null,a.Z.siteName," | ",r.attributes.title),e.createElement("meta",{name:"description",content:r.attributes.description})),e.createElement(p.Z,{title:r.attributes.title,details:r.attributes.description}),e.createElement("article",{className:"markdown",dangerouslySetInnerHTML:{__html:r.html}}))}const f=k;var b=(r,d,h)=>new Promise((m,x)=>{var B=c=>{try{g(h.next(c))}catch(u){x(u)}},R=c=>{try{g(h.throw(c))}catch(u){x(u)}},g=c=>c.done?m(c.value):Promise.resolve(c.value).then(B,R);g((h=h.apply(r,d)).next())});const y=n(5),H=(0,t.x9)(r=>b(void 0,null,function*(){const d=r.replace(/^\.\//,""),h=d.endsWith(".md")?d:`${d}.md`,m=yield y(`./${h}`);return m}),{id:"blog-post"}),w=H;var T=n(976);const v=(0,t.iT)(f);function E(){const{slug:r}=(0,s.UO)(),d=w.use(r);return e.createElement(e.Fragment,null,e.createElement(o.q,{htmlAttributes:{lang:"en-us"}},e.createElement("title",null,a.Z.siteName," | Blog Post"),e.createElement("meta",{name:"description",content:T.Z.hero.details})),e.createElement("div",{className:"container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto"},e.createElement("main",{className:"my-8"},e.createElement("div",{className:"my-8"},e.createElement(v,{post:d})))))}const P=E},216:l=>{l.exports={attributes:{title:"Hello World",description:"This is my first post on my new fake blog! How exciting!",categories:["Examples"]},html:`<p>This is my first post on my new fake blog! How exciting!</p>
<p>I'm sure I'll write a lot more interesting things in the future.</p>
<p>Oh, and here's a great quote from this Wikipedia on
<a href="https://en.wikipedia.org/wiki/Salted_duck_egg">salted duck eggs</a>.</p>
<blockquote>
<p>A salted duck egg is a Chinese preserved food product made by soaking duck
eggs in brine, or packing each egg in damp, salted charcoal. In Asian
supermarkets, these eggs are sometimes sold covered in a thick layer of salted
charcoal paste. The eggs may also be sold with the salted paste removed,
wrapped in plastic, and vacuum packed. From the salt curing process, the
salted duck eggs have a briny aroma, a gelatin-like egg white and a
firm-textured, round yolk that is bright orange-red in color.</p>
</blockquote>
<p>You can also write code blocks here!</p>
<pre><code class="language-js">const saltyDuckEgg = &quot;chinese preserved food product&quot;;
</code></pre>
<table>
<thead>
<tr>
<th style="text-align:left">Number</th>
<th style="text-align:left">Title</th>
<th style="text-align:right">Year</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">Harry Potter and the Philosopher\u2019s Stone</td>
<td style="text-align:right">2001</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">Harry Potter and the Chamber of Secrets</td>
<td style="text-align:right">2002</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">Harry Potter and the Prisoner of Azkaban</td>
<td style="text-align:right">2004</td>
</tr>
</tbody>
</table>
<p><a href="https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md">View raw (TEST.md)</a></p>
<p>This is a paragraph.</p>
<pre><code>This is a paragraph.
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<pre><code>Header 1
========

Header 2
--------
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
<pre><code># Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
<pre><code># Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######
</code></pre>
<blockquote>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p>
</blockquote>
<pre><code>&gt; Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
</code></pre>
<blockquote>
<h2>This is a header.</h2>
<ol>
<li>This is the first list item.</li>
<li>This is the second list item.</li>
</ol>
<p>Here's some example code:</p>
<pre><code>Markdown.generate();
</code></pre>
</blockquote>
<pre><code>&gt; ## This is a header.
&gt; 1. This is the first list item.
&gt; 2. This is the second list item.
&gt;
&gt; Here's some example code:
&gt;
&gt;     Markdown.generate();
</code></pre>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<pre><code class="language-markdown">- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue
</code></pre>
<ul>
<li><code>code goes</code> here in this line</li>
<li><strong>bold</strong> goes here</li>
</ul>
<pre><code class="language-markdown">- \`code goes\` here in this line
- **bold** goes here
</code></pre>
<ol>
<li>Buy flour and salt</li>
<li>Mix together with water</li>
<li>Bake</li>
</ol>
<pre><code class="language-markdown">1. Buy flour and salt
1. Mix together with water
1. Bake
</code></pre>
<ol>
<li><code>code goes</code> here in this line</li>
<li><strong>bold</strong> goes here</li>
</ol>
<pre><code class="language-markdown">1. \`code goes\` here in this line
1. **bold** goes here
</code></pre>
<p>Paragraph:</p>
<pre><code>Code
</code></pre>
<!-- -->
<pre><code>Paragraph:

    Code
</code></pre>
<hr>
<hr>
<hr>
<hr>
<hr>
<pre><code>* * *

***

*****

- - -

---------------------------------------
</code></pre>
<p>This is <a href="http://example.com" title="Example">an example</a> link.</p>
<p><a href="http://example.com">This link</a> has no title attr.</p>
<p>This is <a href="http://example.com" title="Optional Title">an example</a> reference-style link.</p>
<pre><code>This is [an example](http://example.com &quot;Example&quot;) link.

[This link](http://example.com) has no title attr.

This is [an example] [id] reference-style link.

[id]: http://example.com &quot;Optional Title&quot;
</code></pre>
<p><em>single asterisks</em></p>
<p><em>single underscores</em></p>
<p><strong>double asterisks</strong></p>
<p><strong>double underscores</strong></p>
<pre><code>*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
</code></pre>
<p>This paragraph has some <code>code</code> in it.</p>
<pre><code>This paragraph has some \`code\` in it.
</code></pre>
`}},882:l=>{l.exports={attributes:{title:"Hello Again",description:"This is my second post on my new fake blog! How exciting!",categories:["Examples"]},html:`<p>This is my second post on my new fake blog! How exciting!</p>
<p>I'm sure I'll write a lot more interesting things in the future.</p>
<p>Oh, and here's a great quote from this Wikipedia on
<a href="https://en.wikipedia.org/wiki/Salted_duck_egg">salted duck eggs</a>.</p>
<blockquote>
<p>A salted duck egg is a Chinese preserved food product made by soaking duck
eggs in brine, or packing each egg in damp, salted charcoal. In Asian
supermarkets, these eggs are sometimes sold covered in a thick layer of salted
charcoal paste. The eggs may also be sold with the salted paste removed,
wrapped in plastic, and vacuum packed. From the salt curing process, the
salted duck eggs have a briny aroma, a gelatin-like egg white and a
firm-textured, round yolk that is bright orange-red in color.</p>
</blockquote>
<p>You can also write code blocks here!</p>
<pre><code class="language-js">const saltyDuckEgg = &quot;chinese preserved food product&quot;;
</code></pre>
<table>
<thead>
<tr>
<th style="text-align:left">Number</th>
<th style="text-align:left">Title</th>
<th style="text-align:right">Year</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">Harry Potter and the Philosopher\u2019s Stone</td>
<td style="text-align:right">2001</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">Harry Potter and the Chamber of Secrets</td>
<td style="text-align:right">2002</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">Harry Potter and the Prisoner of Azkaban</td>
<td style="text-align:right">2004</td>
</tr>
</tbody>
</table>
<p><a href="https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md">View raw (TEST.md)</a></p>
<p>This is a paragraph.</p>
<pre><code>This is a paragraph.
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<pre><code>Header 1
========

Header 2
--------
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
<pre><code># Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
</code></pre>
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
<pre><code># Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######
</code></pre>
<blockquote>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p>
</blockquote>
<pre><code>&gt; Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
</code></pre>
<blockquote>
<h2>This is a header.</h2>
<ol>
<li>This is the first list item.</li>
<li>This is the second list item.</li>
</ol>
<p>Here's some example code:</p>
<pre><code>Markdown.generate();
</code></pre>
</blockquote>
<pre><code>&gt; ## This is a header.
&gt; 1. This is the first list item.
&gt; 2. This is the second list item.
&gt;
&gt; Here's some example code:
&gt;
&gt;     Markdown.generate();
</code></pre>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>
<pre><code class="language-markdown">- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue
</code></pre>
<ul>
<li><code>code goes</code> here in this line</li>
<li><strong>bold</strong> goes here</li>
</ul>
<pre><code class="language-markdown">- \`code goes\` here in this line
- **bold** goes here
</code></pre>
<ol>
<li>Buy flour and salt</li>
<li>Mix together with water</li>
<li>Bake</li>
</ol>
<pre><code class="language-markdown">1. Buy flour and salt
1. Mix together with water
1. Bake
</code></pre>
<ol>
<li><code>code goes</code> here in this line</li>
<li><strong>bold</strong> goes here</li>
</ol>
<pre><code class="language-markdown">1. \`code goes\` here in this line
1. **bold** goes here
</code></pre>
<p>Paragraph:</p>
<pre><code>Code
</code></pre>
<!-- -->
<pre><code>Paragraph:

    Code
</code></pre>
<hr>
<hr>
<hr>
<hr>
<hr>
<pre><code>* * *

***

*****

- - -

---------------------------------------
</code></pre>
<p>This is <a href="http://example.com" title="Example">an example</a> link.</p>
<p><a href="http://example.com">This link</a> has no title attr.</p>
<p>This is <a href="http://example.com" title="Optional Title">an example</a> reference-style link.</p>
<pre><code>This is [an example](http://example.com &quot;Example&quot;) link.

[This link](http://example.com) has no title attr.

This is [an example] [id] reference-style link.

[id]: http://example.com &quot;Optional Title&quot;
</code></pre>
<p><em>single asterisks</em></p>
<p><em>single underscores</em></p>
<p><strong>double asterisks</strong></p>
<p><strong>double underscores</strong></p>
<pre><code>*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
</code></pre>
<p>This paragraph has some <code>code</code> in it.</p>
<pre><code>This paragraph has some \`code\` in it.
</code></pre>
`}}}]);

//# sourceMappingURL=358.9d0f808750cd2f513959.js.map