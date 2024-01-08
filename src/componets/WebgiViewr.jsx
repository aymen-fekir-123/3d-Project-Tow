import React, { useRef, useCallback, useState, useImperativeHandle, useEffect, forwardRef } from 'react'
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,


  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/scroll-animation';

gsap.registerPlugin(ScrollTrigger);

const WebgiViewr = forwardRef((props, ref) => {
  const canvasref = useRef(null)

  const [viewerref, setviewerref] = useState(null)
  const [cameraref, setcameraref] = useState(null)
  const [postionref, setpositonref] = useState(null)
  const [targetref, settargetref] = useState(null)
  const canvascontainorRef = useRef(null)
  const [previewMod, setpreviewMod] = useState(false)
  const [isMobile, setisMobile] = useState(null)

  useImperativeHandle(ref, () => ({

    triggerPreview() {
      setpreviewMod(true)
      canvascontainorRef.current.style.pointerEvents = "all"
      props.contentref.current.style.opacity = "0";
      gsap.to(postionref, {
        x: 13.84,
        y: -2.09,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerref.setDirty()
          cameraref.positionTargetUpdated(true)
        }

      })

      gsap.to(targetref, { x: 0.11, y: 0, z: 0, duration: 2 })
      viewerref.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
    }
  }))

  const memoizedFunction = useCallback((position, target, mobileortablate, onUpdate) => {
    if (target && position && onUpdate) {
      scrollAnimation(position, target, mobileortablate, onUpdate)
    }
  }, [])

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasref.current,
    })

    setviewerref(viewer)

    const mobileortablate = mobileAndTabletCheck()
    setisMobile(mobileAndTabletCheck)


    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)

    // Add a popup(in HTML) with download progress when any asset is downloading.
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    setcameraref(camera)
    setpositonref(position)
    settargetref(target)

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)



    // Required for downloading files from the UI 

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.


    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    // Import and add a GLB file.
    await manager.addFromPath("scene-black.glb")

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false })

    if(mobileortablate) {
      position.set(-16.7, 1.17, 11.7)
      target.set(0, 1.37, 0)
      props.contentref.current.className = "mobile-or-tablet"
    }

    window.scrollTo(0, 0)

    let needupdate = true

    const onUpdate = () => {
      needupdate = true
      viewer.setDirty()
    }

    viewer.addEventListener("preFrame", () => {
      if (needupdate) {
        camera.positionTargetUpdated(true)
        needupdate = false
      }
    })


    memoizedFunction(position, target, mobileortablate, onUpdate)

  }, [])


  useEffect(() => {
    setupViewer()
  }, [])

  const handellExit = useCallback(() => {
    canvascontainorRef.current.style.pointerEvents = "none"
    props.contentref.current.style.opacity = "1";
    setpreviewMod(false)
    viewerref.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
    gsap.to(postionref, {
      x:!isMobile ? 1.56 : 9.36,
      y:!isMobile? 5.0 : 10.95, 
      z:!isMobile ? 0.01 : 0.09, 
      scrollTrigger: {
        trigger: '.display-section',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
        immediateRender: false
      },
      onUpdate: () => {
        viewerref.setDirty()
        cameraref.positionTargetUpdated(true)
      }
    })
    gsap.to(targetref, {
      x:!isMobile ? -0.52 : -1.62,
      y:!isMobile ? 0.32 : 0.02, 
      z:!isMobile ? 0 : 0.06, 
      scrollTrigger: {
        trigger: '.display-section',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
        immediateRender: false
      },

    })

  }, [postionref, targetref, viewerref, cameraref, canvascontainorRef])

  return (
    <div id={'webgi-canvas-container'} ref={canvascontainorRef}>
      <canvas id={'webgi-canvas'} ref={canvasref} />
      {
        previewMod && (
          <button className='button' onClick={handellExit}> Exit </button>
        )
      }
    </div>
  )


})


export default WebgiViewr