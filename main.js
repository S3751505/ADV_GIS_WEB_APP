window.onload = init;

function init(){
    const fullScreenControl = new ol.control.FullScreen();
    const scaleLineControl = new ol.control.ScaleLine();
    const zoomSliderControl = new ol.control.ZoomSlider();
    const zoomToExtentControl = new ol.control.ZoomToExtent();
    const attributionControl = new ol.control.Attribution({
      collapsible: true
    })
    
    
    const map = new ol.Map({
        view: new ol.View({
            extent: [16351656.9737999998033047,-4463702.8905999995768070, 16443434.2447999995201826,-4389387.3344000000506639],
            center: [16395255.039152952,-4424000.271711544],
            zoom: 11.5,
            maxZoom:13,
            minZoom:10,
            rotation: 0
        }),
        target: 'js-map',
        keyboardEventTarget: document,
        controls: ol.control.defaults({attribution: false}).extend([
        fullScreenControl,
        scaleLineControl,
        zoomSliderControl,
        zoomToExtentControl,
        attributionControl
        ])
    })

    // DragRotate Interaction
    const dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly
    })

    map.addInteraction(dragRotateInteraction)

// osm basemap
    const osmstandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        isbaselayer: true,
        title: 'Open Street Map'
    })
    //map.addLayer(osmstandard)

// satellite basemap
    const satellite = new ol.layer.Tile({
        visible: false,
        isbaselayer: true,
        title: 'Satellite',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'LANDSAT Imagery by <a href="https://www.usgs.gov/core-science-systems/nlhtti/landsat/landsat-8?qt-science_support_page_related_con=0#qt-science_support_page_related_con">NASA/USGS</a>, Data obtained through <a href="https://earthengine.google.com/">Google Earth Engine</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": '',
                "LAYERS": 'ADV_GIS:ef_landsat',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16351656.9738 + "," + -4463702.8906,
          }
        })
      })
      //map.addLayer(satellite)

//base layer group      
    const baseLayerGroup = new ol.layer.Group({
        layers: [
           osmstandard, satellite]
    })
    map.addLayer(baseLayerGroup);

//base layer switcher

    const baseLayerElements = document.querySelectorAll('.sidebar-1 > input[type=radio]');
    for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue)
            })
        })
    }

// WMS layer variations
    const type = new ol.layer.Tile({
        visible: true,
        title: 'Survey Type',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'Survey data obtained from <a href="https://s3.ap-southeast-2.amazonaws.com/hdp.au.prod.app.vic-engage.files/3615/1572/4458/Assessing_the_Impacts_of_Feral_Horses_on_the_Bogong_High_Plains_ATolsma_2018.pdf">Tolsma, A & Shannon, J 2018, Assessing the Impacts of Feral Horses on the Bogong High Plains, Victoria, Arthur Rylah Institute for Environmental Research, Department of Environment, Land Water & Planning.</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": 'type',
                "LAYERS": 'ADV_GIS:ef_survey',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16386454 + "," + -4438378
          }
        })
      })
      //map.addLayer(type)

      const rating = new ol.layer.Tile({
        visible: false,
        title: 'Conservation Rating',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'Bioregional conservation rating obtained from <a href="https://discover.data.vic.gov.au/dataset/native-vegetation-modelled-2005-ecological-vegetation-classes-with-bioregional-conservation-sta">Department of Environment, Land Water & Planning.</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": 'rating',
                "LAYERS": 'ADV_GIS:ef_survey',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16386454 + "," + -4438378
          }
        })
      })
      //map.addLayer(rating)

      const change = new ol.layer.Tile({
        visible: false,
        title: 'Site Change',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'Survey data obtained from <a href="https://s3.ap-southeast-2.amazonaws.com/hdp.au.prod.app.vic-engage.files/3615/1572/4458/Assessing_the_Impacts_of_Feral_Horses_on_the_Bogong_High_Plains_ATolsma_2018.pdf">Tolsma, A & Shannon, J 2018, Assessing the Impacts of Feral Horses on the Bogong High Plains, Victoria, Arthur Rylah Institute for Environmental Research, Department of Environment, Land Water & Planning.</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": 'change',
                "LAYERS": 'ADV_GIS:ef_survey',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16386454 + "," + -4438378
          }
        })
      })
      //map.addLayer(change)

      const activity = new ol.layer.Tile({
        visible: false,
        title: 'Horse Activity',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'Survey data obtained from <a href="https://s3.ap-southeast-2.amazonaws.com/hdp.au.prod.app.vic-engage.files/3615/1572/4458/Assessing_the_Impacts_of_Feral_Horses_on_the_Bogong_High_Plains_ATolsma_2018.pdf">Tolsma, A & Shannon, J 2018, Assessing the Impacts of Feral Horses on the Bogong High Plains, Victoria, Arthur Rylah Institute for Environmental Research, Department of Environment, Land Water & Planning.</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": 'activity',
                "LAYERS": 'ADV_GIS:ef_survey',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16386454 + "," + -4438378
          }
        })
      })
      //map.addLayer(activity)

      const status = new ol.layer.Tile({
        visible: false,
        title: 'Site Status',
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/ADV_GIS/wms',
          attributions: 'Survey data obtained from <a href="https://s3.ap-southeast-2.amazonaws.com/hdp.au.prod.app.vic-engage.files/3615/1572/4458/Assessing_the_Impacts_of_Feral_Horses_on_the_Bogong_High_Plains_ATolsma_2018.pdf">Tolsma, A & Shannon, J 2018, Assessing the Impacts of Feral Horses on the Bogong High Plains, Victoria, Arthur Rylah Institute for Environmental Research, Department of Environment, Land Water & Planning.</a>, under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.',
          params: {'FORMAT': 'image/png', 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": 'status',
                "LAYERS": 'ADV_GIS:ef_survey',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 16386454 + "," + -4438378
          }
        })
      })
      //map.addLayer(status)

//forelayer group      

    const foreLayerGroup = new ol.layer.Group({
        layers: [
           type, status, activity, change, rating]
    })
    map.addLayer(foreLayerGroup);

//forelayer switcher

    const foreLayerElements = document.querySelectorAll('.sidebar-2 > input[type=radio]');
    for(let foreLayerElement of foreLayerElements){
        foreLayerElement.addEventListener('change', function(){
            let foreLayerElementValue = this.value;
            foreLayerGroup.getLayers().forEach(function(element, index, array){
                let foreLayerTitle = element.get('title');
                element.setVisible(foreLayerTitle === foreLayerElementValue)
            })
        })
    }
}

    
