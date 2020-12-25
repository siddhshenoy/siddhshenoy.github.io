var appEvents = {
	windowEvents : {
		init : function() {
			$(window).on("resize", appEvents.windowEvents.onresize);
		},
		onresize : function(e) {
			appData.windowData.screenWidth = window.innerWidth;
			appData.windowData.screenHeight = window.innerHeight;
			let width = appData.windowData.screenWidth;
			let height = appData.windowData.screenHeight;
			appData.glData.renderer.setSize( appData.windowData.screenWidth, appData.windowData.screenHeight );
			appData.glData.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.01, 1000 );
			appData.glData.camera.position.z = 5;
		}
	},
	glEvents : {
		init : function() {
			appData.windowData.screenWidth = window.innerWidth;
			appData.windowData.screenHeight = window.innerHeight;
			let width = appData.windowData.screenWidth;
			let height = appData.windowData.screenHeight;
			appData.glData.scene = new THREE.Scene();
			appData.glData.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.01, 1000 );
			appData.glData.camera.position.z = 1;
			appData.glData.renderer = new THREE.WebGLRenderer();
			appData.glData.renderer.setSize( appData.windowData.screenWidth, appData.windowData.screenHeight );
			$('body').append(appData.glData.renderer.domElement);
			appData.glData.renderer.render(appData.glData.scene, appData.glData.camera);
		},
		draw : function() {
			addLine( new THREE.Vector3(-150.0, 50.0, 0.0), 	new THREE.Vector3(150, 50.0, 0.0), 		appData.glData.scene);
			addLine( new THREE.Vector3(-150.0, -50.0, 0.0), new THREE.Vector3(150.0, -50.0, 0.0),	appData.glData.scene);
			addLine( new THREE.Vector3(50.0, 150.0, 0.0), 	new THREE.Vector3(50, -150.0, 0.0), 	appData.glData.scene);
			addLine( new THREE.Vector3(-50.0, 150.0, 0.0), 	new THREE.Vector3(-50, -150.0, 0.0), 	appData.glData.scene);

			appEvents.glEvents.animate();	
		},
		animate : function() {
			requestAnimationFrame( appEvents.glEvents.animate );
			//console.log(".");
			appData.glData.renderer.render(appData.glData.scene, appData.glData.camera);
		}
	}
};