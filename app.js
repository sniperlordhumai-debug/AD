/* PlantTalk AI Presentation - Application Engine */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // State Management
    // -------------------------------------------------------------------------
    const state = {
        currentSlide: 1,
        totalSlides: 13,
        audioEnabled: true,
        jumpMenuOpen: false,
        scanActive: false,
        selectedPreset: 'tomato',
        customImageLoaded: null,
        presets: {
            tomato: {
                name: 'Tomato Specimen',
                scientific: 'SOLANUM LYCOPERSICUM',
                pathogen: 'Early Blight (Alternaria solani)',
                confidence: '94.2%',
                status: 'PATHOGEN DETECTED',
                isDanger: true,
                emoji: '😢',
                speech: 'My lower leaves are forming dark concentric rings and decaying. I need treatment before it spreads!',
                recs: [
                    'Apply organic copper fungicide spray immediately.',
                    'Prune infected lower foliage to reduce fungal spore count.',
                    'Avoid overhead irrigation; water directly at the root zone.'
                ],
                moisture: 42,
                moistureLabel: '42% (DRY)',
                temp: '24.5 °C',
                humidity: '62%',
                lesions: '3 ACTIVE LESIONS',
                vectorSVG: `
                    <g id="leaf-vector-group">
                        <path d="M 50 15 C 35 25, 25 45, 28 65 C 32 80, 50 90, 50 90 C 50 90, 68 80, 72 65 C 75 45, 65 25, 50 15 Z" fill="rgba(34, 139, 34, 0.45)" stroke="#00ff99" stroke-width="1.5"/>
                        <circle cx="42" cy="45" r="5" fill="rgba(255, 51, 102, 0.6)" stroke="#ff3366" stroke-width="1"/>
                        <circle cx="58" cy="55" r="4" fill="rgba(255, 51, 102, 0.6)" stroke="#ff3366" stroke-width="1"/>
                        <circle cx="48" cy="68" r="6" fill="rgba(255, 51, 102, 0.6)" stroke="#ff3366" stroke-width="1"/>
                        <line x1="10" y1="15" x2="90" y2="85" stroke="rgba(0, 255, 238, 0.15)" stroke-width="0.5"/>
                    </g>
                `
            },
            rose: {
                name: 'Rose Specimen',
                scientific: 'ROSA HYBRIDA',
                pathogen: 'Black Spot (Diplocarpon rosae)',
                confidence: '91.8%',
                status: 'PATHOGEN DETECTED',
                isDanger: true,
                emoji: '🌹',
                speech: 'I have dark circular spots on my upper leaves. They are turning yellow and beginning to drop off!',
                recs: [
                    'Remove and incinerate all fallen foliage to halt infection cycle.',
                    'Apply organic neem oil or sulfur-based spray every 7-10 days.',
                    'Trim dense branches to improve air circulation and sunlight penetration.'
                ],
                moisture: 55,
                moistureLabel: '55% (STABLE)',
                temp: '21.0 °C',
                humidity: '70%',
                lesions: '5 ACTIVE LESIONS',
                vectorSVG: `
                    <g id="leaf-vector-group">
                        <path d="M 50 10 C 25 30, 25 60, 50 90 C 75 60, 75 30, 50 10 Z" fill="rgba(46, 125, 50, 0.45)" stroke="#00ffee" stroke-width="1.5"/>
                        <circle cx="40" cy="35" r="4.5" fill="rgba(20, 20, 20, 0.8)" stroke="#00ffee" stroke-width="1"/>
                        <circle cx="62" cy="42" r="6" fill="rgba(20, 20, 20, 0.8)" stroke="#00ffee" stroke-width="1"/>
                        <circle cx="45" cy="58" r="5" fill="rgba(20, 20, 20, 0.8)" stroke="#00ffee" stroke-width="1"/>
                        <circle cx="58" cy="65" r="4" fill="rgba(20, 20, 20, 0.8)" stroke="#00ffee" stroke-width="1"/>
                        <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(0, 255, 238, 0.2)" stroke-width="1"/>
                    </g>
                `
            },
            monstera: {
                name: 'Monstera Deliciosa',
                scientific: 'MONSTERA DELICIOSA',
                pathogen: 'Nutrient Deficiency & Dehydration',
                confidence: '89.5%',
                status: 'STRESSED ENVIRONMENT',
                isDanger: false,
                emoji: '🍂',
                speech: 'I feel incredibly dry and my leaves are losing their rich green chlorophyll. I need water and nitrogen!',
                recs: [
                    'Water the plant thoroughly until moisture drains from bottom.',
                    'Feed with a balanced liquid nitrogen fertilizer.',
                    'Mist leaves daily or introduce a humidifier to raise humidity levels.'
                ],
                moisture: 18,
                moistureLabel: '18% (CRITICAL)',
                temp: '27.2 °C',
                humidity: '40%',
                lesions: '0 LESIONS (DRY)',
                vectorSVG: `
                    <g id="leaf-vector-group">
                        <path d="M 50 15 C 30 25, 20 40, 25 70 C 30 90, 50 95, 50 95 C 50 95, 70 90, 75 70 C 80 40, 70 25, 50 15 Z" fill="rgba(230, 200, 50, 0.3)" stroke="#ffcc00" stroke-width="1.5"/>
                        <!-- Rib slits -->
                        <path d="M 35 45 Q 45 42 50 40" stroke="#050608" stroke-width="3" fill="none"/>
                        <path d="M 65 50 Q 55 47 50 45" stroke="#050608" stroke-width="3" fill="none"/>
                        <path d="M 30 65 Q 45 60 50 58" stroke="#050608" stroke-width="3" fill="none"/>
                        <path d="M 70 70 Q 55 65 50 62" stroke="#050608" stroke-width="3" fill="none"/>
                        <line x1="50" y1="15" x2="50" y2="95" stroke="rgba(255, 204, 0, 0.2)" stroke-width="1"/>
                    </g>
                `
            }
        }
    };

    // -------------------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------------------
    const dom = {
        slides: document.querySelectorAll('.slide'),
        currentSlideNum: document.getElementById('current-slide-num'),
        totalSlidesNum: document.getElementById('total-slides-num'),
        prevBtn: document.getElementById('prev-slide-btn'),
        nextBtn: document.getElementById('next-slide-btn'),
        timelineFill: document.getElementById('slide-timeline-fill'),
        timelineContainer: document.getElementById('slide-timeline'),
        sfxToggle: document.getElementById('sfx-toggle'),
        sfxIcon: document.getElementById('sfx-icon'),
        sfxText: document.getElementById('sfx-text'),
        outlineToggle: document.getElementById('outline-toggle'),
        quickJumpPanel: document.getElementById('quick-jump-panel'),
        quickJumpClose: document.getElementById('quick-jump-close-btn'),
        quickJumpList: document.getElementById('quick-jump-list'),
        quickJumpTrigger: document.getElementById('quick-jump-trigger'),
        
        // Demo Elements
        presetBtns: document.querySelectorAll('.preset-btn'),
        uploadZone: document.getElementById('demo-upload-dropzone'),
        fileInput: document.getElementById('demo-file-input'),
        scanViewport: document.getElementById('stage-viewport-scan'),
        vectorSvg: document.getElementById('stage-vector-svg'),
        laserLine: document.getElementById('stage-laser'),
        progressContainer: document.getElementById('stage-progress-container'),
        progressFill: document.getElementById('scan-progress-fill'),
        progressPct: document.getElementById('scan-progress-pct'),
        progressText: document.getElementById('scan-progress-text'),
        scanBtn: document.getElementById('start-scan-trigger'),
        resultsOverlay: document.getElementById('stage-results-overlay'),
        resPlantName: document.getElementById('res-plant-name'),
        resHealthStatus: document.getElementById('res-health-status'),
        resPathogenName: document.getElementById('res-pathogen-name'),
        resPathogenConfidence: document.getElementById('res-pathogen-confidence'),
        resEmoji: document.getElementById('res-emoji'),
        resSpeech: document.getElementById('res-speech'),
        resRecsList: document.getElementById('res-recs-list'),
        resResetBtn: document.getElementById('demo-reset-trigger'),
        moistureVal: document.getElementById('telemetry-moisture-val'),
        lesionsVal: document.getElementById('telemetry-lesions-val'),
        resTemp: document.getElementById('res-val-temp'),
        resHumidity: document.getElementById('res-val-humidity'),
        demoStatusText: document.getElementById('demo-hud-status')
    };

    // Initialize labels
    dom.totalSlidesNum.textContent = String(state.totalSlides).padStart(2, '0');

    // -------------------------------------------------------------------------
    // Audio Synthesis Engine (Web Audio API)
    // -------------------------------------------------------------------------
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(type) {
        if (!state.audioEnabled) return;
        try {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const now = audioCtx.currentTime;

            if (type === 'click') {
                // Short organic click beep
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.1);
            } 
            else if (type === 'hover') {
                // Subtle static pop
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1200, now);
                gain.gain.setValueAtTime(0.015, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } 
            else if (type === 'transition') {
                // Soft frequency sweep
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
            }
            else if (type === 'scan-start') {
                // Laser power-up sweep
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.005, now + 1.2);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 1.2);
            }
            else if (type === 'scan-pulse') {
                // Periodic telemetry pulse
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.setValueAtTime(1200, now + 0.05);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            }
            else if (type === 'success') {
                // Futuristic double chime
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(523.25, now); // C5
                osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
                
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(783.99, now + 0.12); // G5
                osc2.frequency.setValueAtTime(1046.50, now + 0.24); // C6

                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                
                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc1.start(now);
                osc1.stop(now + 0.6);
                osc2.start(now + 0.12);
                osc2.stop(now + 0.6);
            }
            else if (type === 'reset') {
                // De-escalating scale down
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.4);
            }
        } catch (e) {
            console.warn('Audio Synthesis failed, check browser policies:', e);
        }
    }

    // Toggle Audio Setting
    dom.sfxToggle.addEventListener('click', () => {
        state.audioEnabled = !state.audioEnabled;
        if (state.audioEnabled) {
            dom.sfxIcon.setAttribute('data-lucide', 'volume-2');
            dom.sfxText.textContent = 'AUDIO ON';
            playSound('click');
        } else {
            dom.sfxIcon.setAttribute('data-lucide', 'volume-x');
            dom.sfxText.textContent = 'AUDIO OFF';
        }
        lucide.createIcons();
    });

    // Add subtle hover sound to all buttons
    document.querySelectorAll('button, .quick-jump-item, .upload-box, .preset-btn').forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
    });

    // -------------------------------------------------------------------------
    // Slide Navigation Deck Engine
    // -------------------------------------------------------------------------
    function goToSlide(index) {
        if (index < 1 || index > state.totalSlides) return;
        
        playSound('transition');
        
        dom.slides.forEach(slide => {
            const slideId = parseInt(slide.getAttribute('id').split('-')[1]);
            slide.classList.remove('active', 'past', 'future');
            
            if (slideId === index) {
                slide.classList.add('active');
            } else if (slideId < index) {
                slide.classList.add('past');
            } else {
                slide.classList.add('future');
            }
        });

        state.currentSlide = index;
        dom.currentSlideNum.textContent = String(index).padStart(2, '0');
        
        // Progress filling
        const progressPct = ((index - 1) / (state.totalSlides - 1)) * 100;
        dom.timelineFill.style.width = `${progressPct}%`;

        // Highlight jump menu item
        document.querySelectorAll('.quick-jump-item').forEach(item => {
            const destIdx = parseInt(item.getAttribute('data-slide'));
            if (destIdx === index) {
                item.classList.add('current');
            } else {
                item.classList.remove('current');
            }
        });

        // Trigger node canvas calculation on slide change to Slide 6
        if (index === 6) {
            startArchNetworkAnimation();
        } else {
            stopArchNetworkAnimation();
        }
    }

    function nextSlide() {
        if (state.currentSlide < state.totalSlides) {
            goToSlide(state.currentSlide + 1);
        }
    }

    function prevSlide() {
        if (state.currentSlide > 1) {
            goToSlide(state.currentSlide - 1);
        }
    }

    // Controls bindings
    dom.nextBtn.addEventListener('click', () => {
        playSound('click');
        nextSlide();
    });
    dom.prevBtn.addEventListener('click', () => {
        playSound('click');
        prevSlide();
    });

    // Timeline bar click jumping
    dom.timelineContainer.addEventListener('click', (e) => {
        const bounds = dom.timelineContainer.getBoundingClientRect();
        const clickRatio = (e.clientX - bounds.left) / bounds.width;
        const targetSlide = Math.min(
            state.totalSlides,
            Math.max(1, Math.round(clickRatio * (state.totalSlides - 1)) + 1)
        );
        playSound('click');
        goToSlide(targetSlide);
    });

    // Keyboard bindings
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
            e.preventDefault();
            prevSlide();
        }
    });

    // -------------------------------------------------------------------------
    // Quick Directory Index Navigation Menu
    // -------------------------------------------------------------------------
    const slideTitles = [
        "Title Slide",
        "The Environmental Crisis",
        "Problem Statement",
        "Our Solution",
        "Processing Workflow",
        "System Architecture",
        "Technology Stack",
        "Core Innovations",
        "Sustainability Impact",
        "Live Product Demonstration",
        "Future Roadmap",
        "Meet The Developers",
        "Vision / Thank You"
    ];

    // Populate Jump List
    slideTitles.forEach((title, idx) => {
        const li = document.createElement('li');
        li.className = `quick-jump-item ${idx === 0 ? 'current' : ''}`;
        li.setAttribute('data-slide', idx + 1);
        
        li.innerHTML = `
            <span>${title}</span>
            <span class="quick-jump-item-num">P.${String(idx + 1).padStart(2, '0')}</span>
        `;

        li.addEventListener('click', () => {
            playSound('click');
            goToSlide(idx + 1);
            closeJumpMenu();
        });

        dom.quickJumpList.appendChild(li);
    });

    function toggleJumpMenu() {
        state.jumpMenuOpen = !state.jumpMenuOpen;
        if (state.jumpMenuOpen) {
            dom.quickJumpPanel.classList.add('active');
        } else {
            dom.quickJumpPanel.classList.remove('active');
        }
    }

    function closeJumpMenu() {
        state.jumpMenuOpen = false;
        dom.quickJumpPanel.classList.remove('active');
    }

    dom.outlineToggle.addEventListener('click', () => {
        playSound('click');
        toggleJumpMenu();
    });
    dom.quickJumpTrigger.addEventListener('click', () => {
        playSound('click');
        toggleJumpMenu();
    });
    dom.quickJumpClose.addEventListener('click', () => {
        playSound('click');
        closeJumpMenu();
    });

    // Close jump menu if clicking outside of it
    document.addEventListener('click', (e) => {
        if (!dom.quickJumpPanel.contains(e.target) && 
            !dom.outlineToggle.contains(e.target) && 
            !dom.quickJumpTrigger.contains(e.target) && 
            state.jumpMenuOpen) {
            closeJumpMenu();
        }
    });

    // -------------------------------------------------------------------------
    // Slide 6: Dynamic Network Flow Canvas
    // -------------------------------------------------------------------------
    const archCanvas = document.getElementById('arch-canvas');
    const archCtx = archCanvas.getContext('2d');
    let archAnimId = null;
    let archRunning = false;

    // Define Network Nodes
    const nodes = [
        { id: 1, label: 'User Client', sub: '(React Environment)', x: 0.12, y: 0.5, color: '#00ff99' },
        { id: 2, label: 'Gateway API', sub: '(Flask Micro)', x: 0.38, y: 0.35, color: '#00ffee' },
        { id: 3, label: 'Deep Learning Core', sub: '(TensorFlow CNN)', x: 0.65, y: 0.65, color: '#ff3366' },
        { id: 4, label: 'Botanical Knowledge', sub: '(Database Maps)', x: 0.65, y: 0.25, color: '#ffcc00' },
        { id: 5, label: 'Dynamic Dashboard', sub: '(Diagnostic HUD)', x: 0.88, y: 0.5, color: '#00ff99' }
    ];

    // Node Links definition
    const links = [
        { from: 1, to: 2, speed: 0.008, packets: [] },
        { from: 2, to: 3, speed: 0.012, packets: [] },
        { from: 2, to: 4, speed: 0.01, packets: [] },
        { from: 3, to: 5, speed: 0.015, packets: [] },
        { from: 4, to: 5, speed: 0.012, packets: [] }
    ];

    function resizeArchCanvas() {
        const parent = archCanvas.parentElement;
        archCanvas.width = parent.clientWidth;
        archCanvas.height = parent.clientHeight;
    }

    function animateArchNetwork() {
        if (!archRunning) return;
        
        archCtx.clearRect(0, 0, archCanvas.width, archCanvas.height);
        const w = archCanvas.width;
        const h = archCanvas.height;

        // Draw Links
        archCtx.lineWidth = 1.5;
        links.forEach(link => {
            const nodeFrom = nodes.find(n => n.id === link.from);
            const nodeTo = nodes.find(n => n.id === link.to);
            const x1 = nodeFrom.x * w;
            const y1 = nodeFrom.y * h;
            const x2 = nodeTo.x * w;
            const y2 = nodeTo.y * h;

            // Base connection path
            archCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            archCtx.beginPath();
            archCtx.moveTo(x1, y1);
            archCtx.lineTo(x2, y2);
            archCtx.stroke();

            // Spawn data packets randomly
            if (Math.random() < 0.015) {
                link.packets.push({ pos: 0, val: Math.random() > 0.5 });
            }

            // Draw glowing flowing data packets
            link.packets.forEach((packet, idx) => {
                packet.pos += link.speed;
                if (packet.pos >= 1) {
                    link.packets.splice(idx, 1);
                    return;
                }
                const px = x1 + (x2 - x1) * packet.pos;
                const py = y1 + (y2 - y1) * packet.pos;

                archCtx.fillStyle = packet.val ? '#00ff99' : '#00ffee';
                archCtx.shadowColor = packet.val ? '#00ff99' : '#00ffee';
                archCtx.shadowBlur = 10;
                archCtx.beginPath();
                archCtx.circle(px, py, 4); // Standard Canvas polyfill for circle is drawn manually:
                archCtx.arc(px, py, 3.5, 0, Math.PI * 2);
                archCtx.fill();
                archCtx.shadowBlur = 0; // reset
            });
        });

        // Draw Nodes
        nodes.forEach(node => {
            const nx = node.x * w;
            const ny = node.y * h;

            // Outer pulse ring
            archCtx.strokeStyle = node.color;
            archCtx.lineWidth = 1;
            archCtx.shadowColor = node.color;
            archCtx.shadowBlur = 5;
            archCtx.beginPath();
            const ringRadius = 14 + Math.sin(Date.now() * 0.005) * 2;
            archCtx.arc(nx, ny, ringRadius, 0, Math.PI * 2);
            archCtx.stroke();
            archCtx.shadowBlur = 0;

            // Solid inner node core
            archCtx.fillStyle = '#0a0e14';
            archCtx.beginPath();
            archCtx.arc(nx, ny, 10, 0, Math.PI * 2);
            archCtx.fill();
            archCtx.strokeStyle = node.color;
            archCtx.lineWidth = 2;
            archCtx.stroke();

            // Label text
            archCtx.fillStyle = '#ffffff';
            archCtx.font = 'bold 11px Orbitron';
            archCtx.textAlign = 'center';
            archCtx.fillText(node.label, nx, ny - 24);

            archCtx.fillStyle = '#8f9cae';
            archCtx.font = '9px Share Tech Mono';
            archCtx.fillText(node.sub, nx, ny - 12);
        });

        archAnimId = requestAnimationFrame(animateArchNetwork);
    }

    function startArchNetworkAnimation() {
        resizeArchCanvas();
        archRunning = true;
        animateArchNetwork();
    }

    function stopArchNetworkAnimation() {
        archRunning = false;
        if (archAnimId) {
            cancelAnimationFrame(archAnimId);
            archAnimId = null;
        }
    }

    window.addEventListener('resize', () => {
        if (state.currentSlide === 6) {
            resizeArchCanvas();
        }
    });

    // -------------------------------------------------------------------------
    // Slide 10: Live Product Demo Simulator Node
    // -------------------------------------------------------------------------
    
    // Preset plant item switching
    dom.presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.scanActive) return; // ignore during scanning
            
            dom.presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const presetId = btn.getAttribute('data-preset');
            state.selectedPreset = presetId;
            state.customImageLoaded = null;
            
            // Reload Preset Vector SVG markup
            dom.vectorSvg.innerHTML = state.presets[presetId].vectorSVG;
            playSound('click');
            
            dom.demoStatusText.textContent = `LOADED PRESET SPECIMEN: ${presetId.toUpperCase()}`;
        });
    });

    // Custom File Dropzone loader
    dom.uploadZone.addEventListener('click', () => {
        if (state.scanActive) return;
        dom.fileInput.click();
    });

    dom.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        loadCustomImage(file);
    });

    // Drag over support
    dom.uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dom.uploadZone.style.borderColor = 'var(--neon-green)';
    });

    dom.uploadZone.addEventListener('dragleave', () => {
        dom.uploadZone.style.borderColor = 'rgba(0, 255, 238, 0.3)';
    });

    dom.uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dom.uploadZone.style.borderColor = 'rgba(0, 255, 238, 0.3)';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            loadCustomImage(file);
        }
    });

    function loadCustomImage(file) {
        playSound('click');
        const reader = new FileReader();
        reader.onload = (event) => {
            state.customImageLoaded = event.target.result;
            state.selectedPreset = 'custom';
            
            // Remove active markers from presets
            dom.presetBtns.forEach(b => b.classList.remove('active'));
            
            // Replace vector content with actual image element
            dom.vectorSvg.innerHTML = `
                <image href="${event.target.result}" width="100" height="100" x="0" y="0" preserveAspectRatio="xMidYMid slice" class="scan-image-underlay" />
            `;
            
            dom.demoStatusText.textContent = `UPLOADED SPECIMEN: ${file.name.substring(0, 20)}`;
        };
        reader.readAsDataURL(file);
    }

    // Trigger AI Scanner
    dom.scanBtn.addEventListener('click', () => {
        if (state.scanActive) return;
        
        state.scanActive = true;
        playSound('scan-start');
        
        dom.scanBtn.disabled = true;
        dom.scanBtn.style.opacity = '0';
        dom.laserLine.classList.add('scanning');
        dom.progressContainer.classList.add('active');
        
        let pct = 0;
        const progressLabels = [
            { threshold: 0, label: 'SPECTRUM SENSORS BOOTING...' },
            { threshold: 20, label: 'CNN PIXEL ANALYSIS ENGAGING...' },
            { threshold: 45, label: 'CLASSIFICATION PROBABILITIES MAPPED...' },
            { threshold: 70, label: 'CONNECTING FLASK API GATEWAY...' },
            { threshold: 88, label: 'SYNTHESIZING EMOTIVE TELEMETRY...' },
            { threshold: 98, label: 'RESOLVING RESULTS ENVIRONMENT...' }
        ];

        // Animate progression bar
        const scanTimerInterval = setInterval(() => {
            pct += 1;
            dom.progressPct.textContent = `${pct}%`;
            dom.progressFill.style.width = `${pct}%`;

            // Play periodic ticking sounds
            if (pct % 8 === 0) {
                playSound('scan-pulse');
            }

            // Find matching progress label
            const labelObj = [...progressLabels].reverse().find(l => pct >= l.threshold);
            if (labelObj) {
                dom.progressText.textContent = labelObj.label;
                dom.demoStatusText.textContent = `SCANNING... [${pct}%] - ${labelObj.label}`;
            }

            if (pct >= 100) {
                clearInterval(scanTimerInterval);
                finishScanning();
            }
        }, 30);
    });

    function finishScanning() {
        playSound('success');
        
        state.scanActive = false;
        
        // Grab current diagnostic data
        let diagData = state.presets[state.selectedPreset];
        if (state.selectedPreset === 'custom') {
            diagData = {
                name: 'Custom Specimen',
                scientific: 'BOTANICAL SPECIMEN X',
                pathogen: 'Healthy Specimen (Stable Structure)',
                confidence: '97.6%',
                status: 'HEALTHY STRUCTURE',
                isDanger: false,
                emoji: '🌿',
                speech: 'I feel strong and hydrated! Thank you for maintaining my environment!',
                recs: [
                    'Keep providing bright, indirect sunlight.',
                    'Check soil hydration layer weekly before watering.',
                    'Gently dust leaves to maximize photosynthesis efficiency.'
                ],
                moisture: 65,
                moistureLabel: '65% (OPTIMAL)',
                temp: '22.8 °C',
                humidity: '55%',
                lesions: '0 LESIONS (HEALTHY)'
            };
        }

        // Populating dynamic text fields
        dom.resPlantName.textContent = diagData.name;
        document.querySelector('.diag-summary-panel div div div').nextElementSibling.textContent = `TAG: ${diagData.scientific}`;
        dom.resHealthStatus.textContent = diagData.status;
        
        if (diagData.isDanger) {
            dom.resHealthStatus.className = 'diag-status-badge danger';
            dom.resPathogenName.style.color = 'var(--warning-red)';
            document.getElementById('res-card-pathogen').className = 'diag-result-card danger';
        } else {
            dom.resHealthStatus.className = 'diag-status-badge';
            dom.resPathogenName.style.color = 'var(--neon-green)';
            document.getElementById('res-card-pathogen').className = 'diag-result-card';
        }

        dom.resPathogenName.textContent = diagData.pathogen;
        dom.resPathogenConfidence.textContent = `CONFIDENCE: ${diagData.confidence} (TENSORFLOW CNN KERNEL)`;
        dom.resEmoji.textContent = diagData.emoji;
        dom.resSpeech.textContent = `"${diagData.speech}"`;
        
        // Clear and add list items
        dom.resRecsList.innerHTML = '';
        diagData.recs.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'diag-rec-item';
            li.innerHTML = `
                <i data-lucide="${diagData.isDanger ? 'shield-alert' : 'check'}"></i>
                <span>${rec}</span>
            `;
            dom.resRecsList.appendChild(li);
        });

        // Telemetry details
        dom.moistureVal.textContent = diagData.moistureLabel;
        dom.lesionsVal.textContent = diagData.lesions;
        dom.resTemp.textContent = diagData.temp;
        dom.resHumidity.textContent = diagData.humidity;

        lucide.createIcons();

        // Render line charts
        renderMoistureGraph(diagData.moisture);

        // Slide overlay active
        dom.resultsOverlay.classList.add('active');
        dom.demoStatusText.textContent = `DIAGNOSIS REPORT GENERATED [${diagData.status}]`;
    }

    // Reset Demo Playground
    dom.resResetBtn.addEventListener('click', () => {
        playSound('reset');
        
        dom.resultsOverlay.classList.remove('active');
        dom.laserLine.classList.remove('scanning');
        dom.progressContainer.classList.remove('active');
        dom.progressFill.style.width = '0%';
        dom.progressPct.textContent = '0%';
        
        dom.scanBtn.disabled = false;
        dom.scanBtn.style.opacity = '1';
        
        if (state.selectedPreset === 'custom' && state.customImageLoaded) {
            // Restore custom image display
            dom.vectorSvg.innerHTML = `
                <image href="${state.customImageLoaded}" width="100" height="100" x="0" y="0" preserveAspectRatio="xMidYMid slice" class="scan-image-underlay" />
            `;
        } else {
            // Restore vector SVG markup
            dom.vectorSvg.innerHTML = state.presets[state.selectedPreset].vectorSVG;
        }

        dom.demoStatusText.textContent = 'SYSTEM RESET - READY FOR SPECTRUM SCAN';
    });

    // -------------------------------------------------------------------------
    // Slide 10 Telemetry Canvas Chart Drawer
    // -------------------------------------------------------------------------
    function renderMoistureGraph(finalVal) {
        const canvas = document.getElementById('moisture-chart-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Draw horizontal grid lines
        ctx.strokeStyle = 'rgba(0, 255, 238, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const gy = (h - 20) * (i / 4) + 10;
            ctx.beginPath();
            ctx.moveTo(10, gy);
            ctx.lineTo(w - 10, gy);
            ctx.stroke();
        }

        // High-tech line gradient setup
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, '#00ffee');
        gradient.addColorStop(1, '#00ff99');

        // Draw historic simulation wave nodes
        const points = [
            { x: 0.1, y: 0.7 },
            { x: 0.25, y: 0.65 },
            { x: 0.4, y: 0.8 },
            { x: 0.55, y: 0.55 },
            { x: 0.7, y: 0.75 },
            { x: 0.85, y: 0.6 },
            { x: 1.0, y: (100 - finalVal) / 100 } // link to actual moisture value
        ];

        // Draw lines connecting coordinates
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(0, 255, 153, 0.4)';
        ctx.shadowBlur = 6;
        
        ctx.beginPath();
        points.forEach((pt, idx) => {
            const px = pt.x * (w - 20) + 10;
            const py = pt.y * (h - 20) + 10;
            if (idx === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        });
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Fill area under line chart
        const fillGradient = ctx.createLinearGradient(0, 0, 0, h);
        fillGradient.addColorStop(0, 'rgba(0, 255, 153, 0.15)');
        fillGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = fillGradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x * (w - 20) + 10, h);
        points.forEach((pt) => {
            ctx.lineTo(pt.x * (w - 20) + 10, pt.y * (h - 20) + 10);
        });
        ctx.lineTo(points[points.length - 1].x * (w - 20) + 10, h);
        ctx.closePath();
        ctx.fill();

        // Draw node circles
        points.forEach((pt, idx) => {
            const px = pt.x * (w - 20) + 10;
            const py = pt.y * (h - 20) + 10;
            
            ctx.fillStyle = '#050608';
            ctx.strokeStyle = idx === points.length - 1 ? '#00ff99' : '#00ffee';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(px, py, idx === points.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Flash active endpoint dot
            if (idx === points.length - 1) {
                ctx.fillStyle = 'rgba(0, 255, 153, 0.3)';
                ctx.beginPath();
                ctx.arc(px, py, 9 + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    // -------------------------------------------------------------------------
    // Canvas Background Spore Particle Field Simulation
    // -------------------------------------------------------------------------
    const bgCanvas = document.getElementById('particles-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];
    const maxParticles = 65;

    function resizeBgCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    
    resizeBgCanvas();
    window.addEventListener('resize', resizeBgCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.size = Math.random() * 2.2 + 0.6;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.5 - 0.1; // rise up
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.4 ? '#00ff99' : '#00ffee';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Fade if heading offscreen top or sides
            if (this.y < 0 || this.x < 0 || this.x > bgCanvas.width) {
                this.reset();
            }
        }

        draw() {
            bgCtx.fillStyle = this.color;
            bgCtx.globalAlpha = this.opacity;
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            bgCtx.fill();
        }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
        bgParticles.push(new Particle());
    }

    function animateParticles() {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        bgParticles.forEach(p => {
            p.update();
            p.draw();
        });
        
        bgCtx.globalAlpha = 1.0; // reset
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();

    // -------------------------------------------------------------------------
    // Initialization Sequence
    // -------------------------------------------------------------------------
    // Load icons
    lucide.createIcons();
    
    // Auto-focus tomato leaf preset graph initial drawing inside demo on startup
    renderMoistureGraph(state.presets.tomato.moisture);
    
    // Welcome sound on user click interaction
    document.addEventListener('click', function initWelcomeSound() {
        playSound('success');
        document.removeEventListener('click', initWelcomeSound);
    }, { once: true });
});
