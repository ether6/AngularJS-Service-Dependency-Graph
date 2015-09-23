'use strict';
angular.module('module-helpSystem')
.service('appVisService', [function () {

	var service = {
		nodes: [],
		nodeIds: [],
		edges: [],
		componentsWorthNoting: [
			'service',
		],
		modules: [
			'module-helpSystem',
			'module-CETarticleList',
			'module-CETarticle',
			'module-CETsearch',
			'module-CETrna',
			'module-CETcontactChannels',
			'module-CETbackButton',
			'module-CETbackToSeachButton',
			'module-CETinitCall',
			'module-CETresponseCall',
			'module-CETinitLiveHelp',
			'module-CETinitAX',
			'module-CETresponseAX',
			'module-CETinitChat',
			'module-CETresponseChat',
			'module-CETLiveHelpWaitAnimation',
			'module-CETglobalAlert',
			'module-CETchannelAlerts',
			'module-CETloader',
			'module-CETcustomerForm',
			'module-CETjumpToLinks',
			'module-CETchannelCallBack',
		],
		init: init
	}

    return service;

    function init () {
	    for (var i = 0; i < service.modules.length; i++) {
	        angular.module(service.modules[i])['_invokeQueue'].forEach(function (value) { 
            	var id = value[2][0];
            	var type = value[1];
	            
	            if (isWorthNoting(type) && isNewNode(id)) {
	            	pushNode(value);
	            	iterateThroughInjectors(id, value);
		        }
	        })
	    };
	    addAllNonModuleDependancies();
	    renderNetworkVis();
		console.log(service);
    };

    function iterateThroughInjectors (id, value) {
    	for (var i = 0; i < value[2][1].length; i++) {
    		var injectorName = value[2][1][i] 
    		if(typeof injectorName == 'string') {
    			pushEdge(id, injectorName);
    			pushNodeId(injectorName);
    		}
    	};
    };

    function pushEdge (id, injectorId) {
    	service.edges.push({
    		data: {
    			source: injectorId,
    			target: id
    		}
    	});
    };

    function isWorthNoting (type) {
    	return service.componentsWorthNoting.indexOf(type) > -1;
    };

    function isNewNode (id) {
    	var nodeWithSameName = service.nodes.filter(function (node) {
    		return node.id == id;
    	});
    	return nodeWithSameName.length == 0;
    };

    function pushNode (value) {
    	service.nodes.push({
            data: {
                id: value[2][0],
                type: value[1],
                name: value[2][0],
                href: ''
            }
        });
        pushNodeId(value[2][0]);
    };

    function pushPartialNode (id) {
    	service.nodes.push({
            data: {
                id: id,
                type: 'unknown',
                name: id,
                href: ''
            }
        });
    };

    function pushNodeId (nodeId) {
        service.nodeIds.push(nodeId);    	
    };

    function addAllNonModuleDependancies () {
	    for (var i = 0; i < service.nodeIds.length; i++) {
	    	if(isNewNode(service.nodeIds[i]))
	    		pushPartialNode(service.nodeIds[i]);
	    };
    }

    function renderNetworkVis () {
		var cy = cytoscape({
		  	container: $('#cy')[0],
		  	style: cytoscape.stylesheet()
			    .selector('node')
					.css({
						'content': 'data(name)',
						'text-valign': 'center',
						'color': 'white',
						'text-outline-width': 1,
						'text-outline-color': '#333',
						'font-size': '.4em',
						'width': '15px',
						'height': '15px',
						'background-color': '#333'
					})
			    .selector('edge')
					.css({
						'target-arrow-color': '#333',
						'target-arrow-shape': 'triangle',
						'line-color': '#333'
					})
			    .selector(':selected')
			    	.css({
						'background-color': 'purple',
						'line-color': 'blue',
						'target-arrow-color': 'blue',
						'text-outline-color': 'purple',
						'font-size': '.4em',
			      	}),
		  	elements: {
		    	nodes: service.nodes,
		    	edges: service.edges
		  	},
		  	layout: {
			    name: "cose",
			}
		});
		  
		cy.on('tap', function(event){
			var evtTarget = event.cyTarget;

			if (evtTarget === cy) {
	  			cy.elements('edge, node').css({
					'target-arrow-color': '#333',
					'line-color': '#333',
					'background-color': '#333',
					'text-outline-color': '#333'				
				});
	  		}
		});

		cy.on('tap', 'node', function () {
  			cy.elements('edge, node').css({
				'target-arrow-color': '#333',
				'line-color': '#333',
				'background-color': '#333',
				'text-outline-color': '#333'				
			});
			this.css({
				'background-color': 'purple',
				'text-outline-color': 'purple'				
			});
			cy.elements('edge').css({
				'target-arrow-color': '#333',
				'line-color': '#333',
				'background-color': '#333',
				'text-outline-color': '#333'
			});
			cy.elements('edge[source = "' + this.id() + '"]').each(function () {
				this.targets().css({
					'background-color': 'red',
					'text-outline-color': 'red'
				});
			}).css({
				'target-arrow-color': 'red',
				'line-color': 'red'
			});
			cy.elements('edge[target = "' + this.id() + '"]').each(function () {
				this.sources().css({
					'background-color': 'blue',
					'text-outline-color': 'blue'
				});
			}).css({
				'target-arrow-color': 'blue',
				'line-color': 'blue'
			});
		});

    }

}]);