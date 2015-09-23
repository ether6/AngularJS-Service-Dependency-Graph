# AngularJS-Service-Dependency-Graph
Draws a directed graph of your app's AngularJS Services.
<hr>
<img src="example.png" alt="">
<p><i>Example of TurboTax's Help System</i></p>
<hr>
To use:

1. Include the following HTML in a page/view that has access to your Angular application
	    
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/2.4.5/cytoscape.min.js"></script>
	    <script src="path/to/appVisService.js"></script>

	    <div id="cy"></div>

		<style>

			#cy {
			  height: 100%;
			  width: 100%;
			  position: absolute;
			  left: 0;
			  top: 0;
			}

			#info {
			  color: #c88;
			  font-size: .1em;
			  position: absolute;
			  z-index: -1;
			  left: 1em;
			  top: 1em;
			}
		</style>

2. Update "path/to/appVisService.js" to reflect the actual path of this file
3. Add your app's modules to the modules array in the appVisService.js file
4. Add the following to your angular .run() method

<code>
  app.run(['appVisService', function (appVisService) {
		  appVisService.init();
	  }
  ]);
</code>
