// 100-Day Personal Upgrade Engine (PUE) Core Script
document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONFIGURATION & STATIC DATA ---
    const PHASES = [
        { id: 1, title: "Phase 1: Foundation", days: [1, 15], focus: "Acquisition, Patch Testing & Skin Acclimation", desc: "Clear surface dullness, establish baseline AM/PM routines, initiate collagen turnover, and test product tolerability. Sun protection is critical." },
        { id: 2, title: "Phase 2: Sharpening", days: [16, 50], focus: "Lymphatic Drainage & Muscle Engagement", desc: "Aggressively target facial puffiness (water weight) with Gua Sha and knuckle massages. Sculpt the jawline masseter muscles via chewing gum, and detan skin weekly." },
        { id: 3, title: "Phase 3: Refinement", days: [51, 100], focus: "Systemic Brightening & Lock-In", desc: "Internal detox (elixirs & green tea) for high skin clarity. Intensify active peeling safely, lock in structural muscle gains, and apply emergency tightening tools." }
    ];

    const INVENTORY_ITEMS = [
        // Skincare Actives
        { id: "inv_1", name: "Minimalist 2% Salicylic Acid + LHA Face Wash", category: "actives", source: "buy", link: "https://www.google.com/search?q=Minimalist+2%25+Salicylic+Acid+LHA+Face+Wash", purpose: "PM Cleanse: Clears sebum & dead cells, resolving sallow dullness" },
        { id: "inv_2", name: "Minimalist Vitamin C Serum (10% or similar)", category: "actives", source: "own", link: "", purpose: "AM Brighten: Melanin inhibitor (fades tan) & collagen co-factor" },
        { id: "inv_3", name: "Sunscreen SPF 50 Gel (Gel-based)", category: "actives", source: "own", link: "", purpose: "AM Protect: Prevents UV melanin activation and collagen sagging" },
        { id: "inv_4", name: "The Ordinary Granactive Retinoid 2% Emulsion", category: "actives", source: "buy", link: "https://www.google.com/search?q=The+Ordinary+Granactive+Retinoid+2%25", purpose: "PM Reset: Accelerates cell turnover for younger, brighter, tighter skin" },
        { id: "inv_5", name: "The Ordinary AHA 30% + BHA 2% Peeling Solution", category: "actives", source: "buy", link: "https://www.google.com/search?q=The+Ordinary+AHA+30%25+BHA+2%25+Peeling", purpose: "PM Peel: High-acid red mask dissolves dead tanned cells (twice weekly)" },
        { id: "inv_6", name: "Plum 3% Niacinamide & Rice Water Gel Cream", category: "actives", source: "buy", link: "https://www.google.com/search?q=Plum+3%25+Niacinamide+Rice+Water+Gel+Cream", purpose: "PM Seal: Repairs barrier, fades spots, and provides instant starch glow" },
        
        // Kitchen Staples / Naturals
        { id: "inv_7", name: "Raw White Rice (Sona Masoori/Basmati)", category: "kitchen", source: "kitchen", link: "", purpose: "Toner: Source of fermented inositol to plump and hydrate cells" },
        { id: "inv_8", name: "Pure Gulab Jal (Rose Water) - Dabur", category: "kitchen", source: "buy", link: "", purpose: "Toner: Anti-inflammatory coolant to stop heat-induced melanin" },
        { id: "inv_9", name: "Raw Honey (Pure, Unprocessed)", category: "kitchen", source: "buy", link: "", purpose: "Internal/Mask: Daily internal elixir and DIY mask hydrating humectant" },
        { id: "inv_10", name: "Multani Mitti (Fuller's Earth)", category: "kitchen", source: "buy", link: "", purpose: "Mask Base: Deep cleanses pores and absorbs surface tan" },
        { id: "inv_11", name: "Papaya Powder (or Fresh Raw Papaya)", category: "kitchen", source: "buy", link: "", purpose: "Mask: Papain enzyme dissolves tanned cells (Dairy-free replacement)" },
        { id: "inv_12", name: "Turmeric (Haldi) Pure Powder", category: "kitchen", source: "kitchen", link: "", purpose: "Mask Accent: Natural anti-inflammatory brightening booster" },
        { id: "inv_13", name: "Saffron Strands (Kesar)", category: "kitchen", source: "buy", link: "", purpose: "Mask Accent: Direct tyrosinase inhibitor blocking melanin production" },
        { id: "inv_14", name: "Fresh Lemons", category: "kitchen", source: "kitchen", link: "", purpose: "Internal Reset: Daily morning warm water elixir base to flush toxins" },
        { id: "inv_15", name: "Plain Green Tea Bags (Lipton/Tetley)", category: "kitchen", source: "buy", link: "", purpose: "Internal PM: EGCG antioxidants shrink fat cells & protect collagen" },
        
        // Physical Tools
        { id: "inv_16", name: "Stainless Steel Gua Sha Tool", category: "tools", source: "buy", link: "https://www.google.com/search?q=Stainless+Steel+Gua+Sha+Tool", purpose: "Jawline Sculpt: Clears stagnant fluid and sculpts facial contours" },
        { id: "inv_17", name: "Silicone Ice Cube Tray", category: "tools", source: "buy", link: "", purpose: "Cold Therapy: Yields clean ice for face dips and massage routines" },
        { id: "inv_18", name: "Spray Bottle (100ml, Fine Mist)", category: "tools", source: "buy", link: "", purpose: "Storage: Houses the 3:1 fermented rice water & rose water toner" },
        { id: "inv_19", name: "Wide-Mouth Glass Bowl", category: "tools", source: "buy", link: "", purpose: "Cold Therapy: Sized for full face submergence in morning ice dips" },
        { id: "inv_20", name: "Thin Cotton Handkerchiefs / Muslin", category: "tools", source: "buy", link: "", purpose: "Cold Therapy: Wraps ice cubes to prevent facial ice burns" },
        { id: "inv_21", name: "Glass Storage Jar (200ml)", category: "tools", source: "buy", link: "", purpose: "Prep: Used to ferment and store clean rice water in the fridge" },
        
        // Lifestyle
        { id: "inv_22", name: "Sugar-Free Chewing Gum (Orbit)", category: "lifestyle", source: "buy", link: "", purpose: "Jawline Muscle: 20 mins daily masseter muscle hypertrophy work" }
    ];

    const MASTER_ROUTINE_STEPS = [
        { id: "step_1", title: "Lemon + Honey + Warm Water", time: "6:30 AM", product: "Warm water + lemon + 1 tsp raw honey", why: "Alkalizes the body and cleanses the sallow, muddy tone caused by a sluggish liver. Cleans the internal lens.", phase: [1, 2, 3] },
        { id: "step_2", title: "Ice Dip + Rice Water + Gulab Jal Toner", time: "7:00 AM", product: "Bowl of Ice-Cold Filtered Water & Fermented Rice-Rose Mist (3:1)", why: "Drains overnight lymph/fluid pooling, immediately revealing a sharper jawline. Toner spritz cools skin and plumps cells.", phase: [1, 2, 3] },
        { id: "step_3", title: "Apply Vitamin C Serum + Sunscreen", time: "Post-Bath (7:20 AM)", product: "Minimalist Vitamin C Serum + Sunscreen SPF 50 (Two-finger length)", why: "Vitamin C fades tan and boosts collagen. Sunscreen protects skin barrier and prevents sagging jowls. SHIFTED to post-bath.", phase: [1, 2, 3] },
        { id: "step_4", title: "Reapply Sunscreen + Chewing Gum + Green Tea", time: "12:00 PM", product: "Reapply Sunscreen + Chew Sugar-Free Gum (20 mins) + Ginger Green Tea", why: "Protects skin from mid-day UV. Chewing gum exercises masseter muscles for a wider jaw. Green tea blocks glycation.", phase: [1, 2, 3] },
        { id: "step_5", title: "Reapply Sunscreen", time: "3:00 PM", product: "Sunscreen SPF 50 (Two-finger length)", why: "Protects collagen and blocks afternoon UV rays from activating melanin and causing sagging jowls.", phase: [1, 2, 3] },
        { id: "step_6", title: "Double Cleanse", time: "Evening", product: "Minimalist 2% Salicylic Acid Face Wash", why: "Clears deep-seated sebum and dead cells from pores. Prevents muddy, oily combination skin build-up.", phase: [1, 2, 3] },
        { id: "step_7", title: "Advanced Cell Reset", time: "Night", product: "The Ordinary Granactive Retinoid 2% (2 drops)", why: "Instructs skin to shed old, tanned cells and generate fresh collagen. Mon & Thu Night only on dry face.", dayOfWeek: [1, 4], phase: [1, 2, 3] },
        { id: "step_8", title: "Glass Skin Ice Massage", time: "Night", product: "Chilled Rice Water + 1 tsp Honey + Ice Cube Massage", why: "Vascular workout. Ice closes pores. Rice water + honey calms retinoid stress, neutralizing dullness. Tue & Fri Night.", dayOfWeek: [2, 5], phase: [1, 2, 3] },
        { id: "step_9", title: "Deep Peel Protocol", time: "Night", product: "The Ordinary AHA 30% + BHA 2% Peeling Solution", why: "High-acid peel dissolves dead skin bonds, exposing a glowing, detanned layer. Wed & Sun Night. 5 mins only.", dayOfWeek: [0, 3], phase: [1, 2, 3] },
        { id: "step_10", title: "Weekend Tan Reset", time: "Night", product: "DIY Mask: Multani Mitti + Papaya + Turmeric + Saffron + Honey", why: "Papain enzymes digest dead cells. Saffron blocks melanin. Sat Night. Apply 15 mins.", dayOfWeek: [6], phase: [1, 2, 3] },
        { id: "step_11", title: "Manual Gua Sha Sculpt", time: "Night", product: "Stainless Steel Gua Sha + PM Moisturizer", why: "Mechanically drains fluid from facial tissues. Trains the face cut to remain defined and firm. Daily PM.", phase: [1, 2, 3] },
        { id: "step_12", title: "Skin Seal", time: "Night", product: "Plum 3% Niacinamide Gel Cream", why: "Repairs the skin barrier, blocks pigmentation, and seals in all active ingredients overnight. Daily PM.", phase: [1, 2, 3] },
        { id: "step_13", title: "Sleep Protocol", time: "Night", product: "Sleep & Hydration (3-4L during day)", why: "Avoids overnight bacterial inflammation. Keeping cells hydrated ensures they reflect light and glow.", phase: [1, 2, 3] }
    ];

    const BLUEPRINT_TIPS = [
        "Phase 1 Tip: Retinoids can cause slight purging. This is normal cell turnover. Keep the skin hydrated and protected.",
        "Phase 2 Tip: Always hold the Gua Sha tool at a flat 15-degree angle. Never use it dry; apply moisturizer/oil first to slide.",
        "Phase 3 Tip: Cut sugar and fried foods. High sugar hardens collagen via glycation, neutralizing jawline tightness."
    ];

    // --- 2. STATE INITIALIZATION ---
    let state = {
        startDate: null,
        logs: {}, // Key: "day_0" to "day_99" -> { completedSteps: [], notes: "", completed: false }
        inventory: INVENTORY_ITEMS.map(item => ({ id: item.id, purchased: item.source === "own" || item.source === "kitchen" })),
        googleScriptUrl: "",
        selectedDayIndex: 0
    };

    // Load from LocalStorage
    function loadState() {
        const saved = localStorage.getItem("pue_100day_state");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state = { ...state, ...parsed };
                // ensure state structure is complete
                if (!state.logs) state.logs = {};
                if (!state.inventory || state.inventory.length === 0) {
                    state.inventory = INVENTORY_ITEMS.map(item => ({ id: item.id, purchased: item.source === "own" || item.source === "kitchen" }));
                }
                return true;
            } catch (e) {
                console.error("Failed to parse local storage state", e);
            }
        }
        return false;
    }

    function saveState() {
        localStorage.setItem("pue_100day_state", JSON.stringify(state));
        updateHUD();
    }

    // --- 3. HELPER FUNCTIONS ---
    function getDayInfo(dayIndex) {
        const dayNum = dayIndex + 1;
        let phase = PHASES[0];
        if (dayNum > 15 && dayNum <= 50) phase = PHASES[1];
        else if (dayNum > 50) phase = PHASES[2];

        let dateStr = "Not set";
        let dateObj = null;
        if (state.startDate) {
            dateObj = new Date(state.startDate);
            dateObj.setDate(dateObj.getDate() + dayIndex);
            dateStr = dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        }
        
        return {
            dayNum,
            dayIndex,
            phase,
            dateStr,
            dateObj
        };
    }

    function getRoutineForDay(dayIndex) {
        const info = getDayInfo(dayIndex);
        const dayNum = info.dayNum;
        const dayOfWeek = info.dateObj ? info.dateObj.getDay() : (dayIndex % 7); // Fallback: align Day 1 as Sunday-equivalent (0) or similar
        
        return MASTER_ROUTINE_STEPS.filter(step => {
            // Filter by phase
            if (dayNum < step.phase[0] || dayNum > step.phase[1]) return false;
            // Filter by day of week (if defined)
            if (step.dayOfWeek && !step.dayOfWeek.includes(dayOfWeek)) return false;
            return true;
        });
    }

    function getActiveDayIndex() {
        if (!state.startDate) return 0;
        const start = new Date(state.startDate);
        start.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diffTime = today - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(0, Math.min(99, diffDays));
    }

    function getStreak() {
        let maxStreak = 0;
        let currentStreak = 0;
        
        // Loop up to today's active index
        const activeIdx = getActiveDayIndex();
        for (let i = 0; i <= activeIdx; i++) {
            const key = `day_${i}`;
            if (state.logs[key] && state.logs[key].completed) {
                currentStreak++;
                if (currentStreak > maxStreak) maxStreak = currentStreak;
            } else {
                currentStreak = 0;
            }
        }
        return currentStreak;
    }

    // --- 4. DOM ELEMENTS ---
    const elements = {
        hudDaysCompleted: document.getElementById("hud-days-completed"),
        hudStreak: document.getElementById("hud-streak"),
        hudCurrentPhase: document.getElementById("hud-current-phase"),
        hudPercentValue: document.getElementById("hud-percent-value"),
        hudProgressFill: document.getElementById("hud-progress-fill"),
        
        tabBtns: document.querySelectorAll(".tab-btn"),
        tabContents: document.querySelectorAll(".tab-content"),
        
        daysGrid: document.getElementById("days-grid"),
        btnResetDates: document.getElementById("btn-reset-dates"),
        
        statCompletedDays: document.getElementById("stat-completed-days"),
        statOverallPercent: document.getElementById("stat-overall-percent"),
        statActiveStreak: document.getElementById("stat-active-streak"),
        statRemainingDays: document.getElementById("stat-remaining-days"),
        currentPhaseFocusTitle: document.getElementById("current-phase-focus-title"),
        currentPhaseFocusDesc: document.getElementById("current-phase-focus-desc"),
        todayBlueprintTip: document.getElementById("today-blueprint-tip"),
        
        trackerSelectedDay: document.getElementById("tracker-selected-day"),
        trackerSelectedPhase: document.getElementById("tracker-selected-phase"),
        btnPrevDay: document.getElementById("btn-prev-day"),
        btnNextDay: document.getElementById("btn-next-day"),
        btnJumpToday: document.getElementById("btn-jump-today"),
        trackerCompletionRatio: document.getElementById("tracker-completion-ratio"),
        trackerChecklist: document.getElementById("tracker-checklist"),
        
        detailStepTitle: document.getElementById("detail-step-title"),
        detailStepWhy: document.getElementById("detail-step-why"),
        detailStepProduct: document.getElementById("detail-step-product"),
        trackerDayNotes: document.getElementById("tracker-day-notes"),
        btnSaveDayLog: document.getElementById("btn-save-day-log"),
        
        inventoryTableBody: document.getElementById("inventory-table-body"),
        budgetProcuredRatio: document.getElementById("budget-procured-ratio"),
        budgetProgressFill: document.getElementById("budget-progress-fill"),
        inventoryFilters: document.querySelectorAll(".filter-btn"),
        
        excelDropzone: document.getElementById("excel-dropzone"),
        excelFileInput: document.getElementById("excel-file-input"),
        btnExportExcel: document.getElementById("btn-export-excel"),
        btnDownloadTemplate: document.getElementById("btn-download-template"),
        
        cloudSyncStatus: document.getElementById("cloud-sync-status"),
        cloudStatusText: document.getElementById("cloud-status-text"),
        inputScriptUrl: document.getElementById("input-script-url"),
        btnCloudPull: document.getElementById("btn-cloud-pull"),
        btnCloudPush: document.getElementById("btn-cloud-push"),
        btnCopyCode: document.getElementById("btn-copy-code"),
        scriptCodeContent: document.getElementById("script-code-content"),
        
        dayModal: document.getElementById("day-modal"),
        modalDayTitle: document.getElementById("modal-day-title"),
        modalDayPhase: document.getElementById("modal-day-phase"),
        modalDayDate: document.getElementById("modal-day-date"),
        modalChecklistContainer: document.getElementById("modal-checklist-container"),
        modalDayNotes: document.getElementById("modal-day-notes"),
        modalCloseBtn: document.getElementById("modal-close-btn"),
        modalCancelBtn: document.getElementById("modal-cancel-btn"),
        modalSaveBtn: document.getElementById("modal-save-btn"),
        
        setupModal: document.getElementById("setup-modal"),
        setupStartDate: document.getElementById("setup-start-date"),
        setupStartBtn: document.getElementById("setup-start-btn"),
        
        toast: document.getElementById("toast"),
        toastMessage: document.getElementById("toast-message"),
        toastIcon: document.getElementById("toast-icon")
    };

    // --- 5. TOAST COMPONENT ---
    function showToast(message, isSuccess = true) {
        elements.toastMessage.textContent = message;
        if (isSuccess) {
            elements.toastIcon.className = "fa-solid fa-circle-check toast-icon";
            elements.toast.style.borderColor = "var(--accent-green)";
            elements.toastIcon.style.color = "var(--accent-green)";
        } else {
            elements.toastIcon.className = "fa-solid fa-triangle-exclamation toast-icon";
            elements.toast.style.borderColor = "var(--accent-red)";
            elements.toastIcon.style.color = "var(--accent-red)";
        }
        elements.toast.classList.add("show");
        setTimeout(() => {
            elements.toast.classList.remove("show");
        }, 3000);
    }

    function getCompoundEffectForDay(dayIndex) {
        const dayNum = dayIndex + 1;
        if (dayNum <= 15) {
            return {
                title: "Days 1-15: The Purge & Acclimation",
                desc: "Skin may feel slightly sensitive. A few small breakouts possible (retinoid pulling out hidden congestion). This is GOOD. Jawline looks sharper in the morning for 1-2 hours after ice dip."
            };
        } else if (dayNum <= 30) {
            return {
                title: "Days 16-30: The Clarity Phase",
                desc: "Dead surface tan begins lifting. Skin looks less \"muddy.\" Morning jawline definition lasts longer. Gua Sha starts feeling natural."
            };
        } else if (dayNum <= 50) {
            return {
                title: "Days 30-50: The Brightness Phase",
                desc: "Visible difference between face and body skin tone. Colleagues may ask if you're sleeping better. The perma-tan on forehead and cheeks is fading."
            };
        } else if (dayNum <= 80) {
            return {
                title: "Days 50-80: The Sculpting Phase",
                desc: "Face looks visibly less puffy even without morning ice dip. Jawline evident in photos at rest. Collagen from retinoid begins firming skin."
            };
        } else {
            return {
                title: "Days 80-100: The Engineer's Edge",
                desc: "Uniform, bright, clear skin tone. Defined jawline that doesn't disappear by evening. You haven't become \"white\"—you've become the sharpest, brightest version of YOUR skin."
            };
        }
    }

    // --- 6. HUD AND STATS BINDINGS ---
    function updateHUD() {
        let completedCount = 0;
        for (let i = 0; i < 100; i++) {
            if (state.logs[`day_${i}`]?.completed) completedCount++;
        }
        
        const streak = getStreak();
        const pct = Math.round((completedCount / 100) * 100);
        
        elements.hudDaysCompleted.textContent = `${completedCount}/100`;
        elements.hudStreak.textContent = `${streak} day${streak !== 1 ? 's' : ''}`;
        elements.hudPercentValue.textContent = `${pct}%`;
        elements.hudProgressFill.style.width = `${pct}%`;
        
        // Phase labels in HUD
        const activeIdx = getActiveDayIndex();
        const activeDayInfo = getDayInfo(activeIdx);
        elements.hudCurrentPhase.textContent = activeDayInfo.phase.title;
        
        // Sidebar Metrics
        if (elements.statCompletedDays) elements.statCompletedDays.textContent = completedCount;
        if (elements.statOverallPercent) elements.statOverallPercent.textContent = `${pct}%`;
        if (elements.statActiveStreak) elements.statActiveStreak.textContent = streak;
        if (elements.statRemainingDays) elements.statRemainingDays.textContent = 100 - completedCount;
        
        if (elements.currentPhaseFocusTitle) {
            const effect = getCompoundEffectForDay(activeIdx);
            elements.currentPhaseFocusTitle.textContent = effect.title;
            elements.currentPhaseFocusDesc.textContent = effect.desc;
        }
        
        // Tip based on active phase
        if (elements.todayBlueprintTip) {
            elements.todayBlueprintTip.textContent = BLUEPRINT_TIPS[activeDayInfo.phase.id - 1] || BLUEPRINT_TIPS[0];
        }
    }

    // --- 7. TAB ROUTING ---
    elements.tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            elements.tabBtns.forEach(b => b.classList.remove("active"));
            elements.tabContents.forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
            
            // View-specific initializations
            if (targetTab === "dashboard-tab") {
                renderGrid();
            } else if (targetTab === "tracker-tab") {
                loadTrackerDay(state.selectedDayIndex);
            } else if (targetTab === "inventory-tab") {
                renderInventory();
            }
        });
    });

    // --- 8. DASHBOARD GRID SYSTEM ---
    function renderGrid() {
        elements.daysGrid.innerHTML = "";
        const activeIdx = getActiveDayIndex();
        
        for (let i = 0; i < 100; i++) {
            const info = getDayInfo(i);
            const key = `day_${i}`;
            const log = state.logs[key] || {};
            
            const cell = document.createElement("div");
            cell.className = "day-cell";
            cell.setAttribute("data-phase", info.phase.id);
            cell.title = `${info.phase.title} - ${info.dateStr}`;
            
            const num = document.createElement("span");
            num.className = "day-cell-num";
            num.textContent = info.dayNum;
            cell.appendChild(num);
            
            const status = document.createElement("div");
            status.className = "day-cell-status";
            cell.appendChild(status);
            
            // Determine grid cell states
            if (log.completed) {
                cell.classList.add("completed");
            } else if (i === activeIdx && state.startDate) {
                cell.classList.add("current");
            } else if (i > activeIdx && state.startDate) {
                cell.classList.add("locked");
            }
            
            cell.addEventListener("click", () => {
                if (cell.classList.contains("locked")) {
                    showToast("This day is in the future. Follow the timeline day-by-day!", false);
                    return;
                }
                openDayModal(i);
            });
            
            elements.daysGrid.appendChild(cell);
        }
    }

    elements.btnResetDates.addEventListener("click", () => {
        elements.setupStartDate.value = state.startDate || new Date().toISOString().substring(0, 10);
        elements.setupModal.classList.add("active");
    });

    // Phase filtering on dashboard (highlights cells in phase, fades others)
    document.querySelectorAll(".phase-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".phase-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            const phaseId = pill.getAttribute("data-phase-filter");
            const cells = document.querySelectorAll(".day-cell");
            
            cells.forEach(cell => {
                if (cell.getAttribute("data-phase") === phaseId) {
                    cell.style.opacity = "1";
                    cell.style.transform = "scale(1.02)";
                } else {
                    cell.style.opacity = "0.25";
                    cell.style.transform = "scale(0.95)";
                }
            });
            
            // Clear filter if clicked again
            setTimeout(() => {
                pill.addEventListener("click", function resetFilter() {
                    pill.classList.remove("active");
                    cells.forEach(cell => {
                        cell.style.opacity = "";
                        cell.style.transform = "";
                    });
                    pill.removeEventListener("click", resetFilter);
                    // restore correct timeline view
                    document.querySelectorAll(".phase-pill").forEach(p => p.classList.remove("active"));
                    // reactivate current phase
                    const activeIdx = getActiveDayIndex();
                    const info = getDayInfo(activeIdx);
                    document.querySelector(`.phase-pill[data-phase-filter="${info.phase.id}"]`).classList.add("active");
                });
            }, 100);
        });
    });

    // --- 9. TRACKER CONTROLLER (DAILY BLUEPRINT) ---
    function loadTrackerDay(dayIndex) {
        state.selectedDayIndex = dayIndex;
        const info = getDayInfo(dayIndex);
        
        elements.trackerSelectedDay.textContent = `Day ${info.dayNum}`;
        elements.trackerSelectedPhase.textContent = `${info.phase.title} (${info.dateStr})`;
        
        elements.btnPrevDay.disabled = dayIndex === 0;
        elements.btnNextDay.disabled = dayIndex >= 99 || (state.startDate && dayIndex >= getActiveDayIndex());
        
        const routine = getRoutineForDay(dayIndex);
        const log = state.logs[`day_${dayIndex}`] || { completedSteps: [], notes: "", completed: false };
        
        elements.trackerChecklist.innerHTML = "";
        let checkCount = 0;
        
        routine.forEach(step => {
            const isChecked = log.completedSteps.includes(step.id);
            if (isChecked) checkCount++;
            
            const item = document.createElement("div");
            item.className = `checklist-item ${isChecked ? 'checked' : ''}`;
            item.setAttribute("data-time", step.time);
            
            const checkbox = document.createElement("div");
            checkbox.className = "checkbox-custom";
            checkbox.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>`;
            item.appendChild(checkbox);
            
            const body = document.createElement("div");
            body.className = "item-details-brief";
            
            const badge = document.createElement("span");
            badge.className = "item-time-badge";
            badge.textContent = step.time;
            body.appendChild(badge);
            
            const title = document.createElement("span");
            title.className = "item-title-text";
            title.textContent = step.title;
            body.appendChild(title);
            
            const product = document.createElement("span");
            product.className = "item-product";
            product.textContent = step.product;
            body.appendChild(product);
            
            item.appendChild(body);
            
            // Checkbox click
            checkbox.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleStep(dayIndex, step.id);
            });
            
            // Entire Card click displays description
            item.addEventListener("click", () => {
                showStepExplanation(step);
                // Highlight item
                document.querySelectorAll(".checklist-item").forEach(ci => ci.style.borderColor = "");
                item.style.borderColor = "var(--accent-cyan)";
            });
            
            elements.trackerChecklist.appendChild(item);
        });
        
        elements.trackerCompletionRatio.textContent = `${checkCount}/${routine.length} Completed`;
        elements.trackerDayNotes.value = log.notes || "";
        
        // Show first step explanation by default
        if (routine.length > 0) {
            showStepExplanation(routine[0]);
        }
    }

    function toggleStep(dayIndex, stepId) {
        const key = `day_${dayIndex}`;
        if (!state.logs[key]) {
            state.logs[key] = { completedSteps: [], notes: "", completed: false };
        }
        
        const steps = state.logs[key].completedSteps;
        const idx = steps.indexOf(stepId);
        if (idx > -1) {
            steps.splice(idx, 1);
        } else {
            steps.push(stepId);
        }
        
        // Check if all steps of the day are checked
        const routine = getRoutineForDay(dayIndex);
        state.logs[key].completed = routine.every(step => steps.includes(step.id));
        
        saveState();
        loadTrackerDay(dayIndex);
    }

    function showStepExplanation(step) {
        elements.detailStepTitle.textContent = `${step.title} (${step.time})`;
        elements.detailStepWhy.textContent = step.why;
        elements.detailStepProduct.style.display = "block";
        elements.detailStepProduct.innerHTML = `<strong>Use:</strong> ${step.product}`;
    }

    elements.btnPrevDay.addEventListener("click", () => {
        if (state.selectedDayIndex > 0) {
            loadTrackerDay(state.selectedDayIndex - 1);
        }
    });

    elements.btnNextDay.addEventListener("click", () => {
        if (state.selectedDayIndex < 99) {
            loadTrackerDay(state.selectedDayIndex + 1);
        }
    });

    elements.btnJumpToday.addEventListener("click", () => {
        loadTrackerDay(getActiveDayIndex());
    });

    elements.btnSaveDayLog.addEventListener("click", () => {
        const key = `day_${state.selectedDayIndex}`;
        if (!state.logs[key]) {
            state.logs[key] = { completedSteps: [], notes: "", completed: false };
        }
        state.logs[key].notes = elements.trackerDayNotes.value;
        
        // Save & Sync automatically
        saveState();
        showToast(`Progress for Day ${state.selectedDayIndex + 1} Saved!`);
        
        // Trigger auto push if Cloud URL is set
        if (state.googleScriptUrl) {
            pushToCloudSilently();
        }
    });

    // --- 10. MODAL DAY GRID DETAILS ---
    function openDayModal(dayIndex) {
        const info = getDayInfo(dayIndex);
        elements.modalDayTitle.textContent = `Day ${info.dayNum} Details`;
        elements.modalDayPhase.textContent = info.phase.title;
        elements.modalDayDate.textContent = `Scheduled: ${info.dateStr}`;
        
        const routine = getRoutineForDay(dayIndex);
        const log = state.logs[`day_${dayIndex}`] || { completedSteps: [], notes: "", completed: false };
        
        elements.modalChecklistContainer.innerHTML = "";
        
        routine.forEach(step => {
            const isChecked = log.completedSteps.includes(step.id);
            const row = document.createElement("label");
            row.className = "checklist-item";
            row.style.padding = "0.75rem";
            
            const checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            checkboxInput.className = "inventory-checkbox";
            checkboxInput.checked = isChecked;
            checkboxInput.style.marginTop = "4px";
            
            checkboxInput.addEventListener("change", () => {
                const key = `day_${dayIndex}`;
                if (!state.logs[key]) state.logs[key] = { completedSteps: [], notes: "", completed: false };
                
                const steps = state.logs[key].completedSteps;
                if (checkboxInput.checked) {
                    if (!steps.includes(step.id)) steps.push(step.id);
                } else {
                    const idx = steps.indexOf(step.id);
                    if (idx > -1) steps.splice(idx, 1);
                }
            });
            
            const spanDiv = document.createElement("div");
            spanDiv.className = "item-details-brief";
            spanDiv.innerHTML = `<span style="font-weight:600; font-size:0.95rem;">${step.title}</span><span style="font-size:0.8rem; color:var(--text-secondary);">${step.product}</span>`;
            
            row.appendChild(checkboxInput);
            row.appendChild(spanDiv);
            elements.modalChecklistContainer.appendChild(row);
        });
        
        elements.modalDayNotes.value = log.notes || "";
        
        // Save action in modal
        elements.modalSaveBtn.onclick = () => {
            const key = `day_${dayIndex}`;
            if (!state.logs[key]) state.logs[key] = { completedSteps: [], notes: "", completed: false };
            
            state.logs[key].notes = elements.modalDayNotes.value;
            
            // Re-evaluate completion
            const finalSteps = state.logs[key].completedSteps;
            state.logs[key].completed = routine.every(step => finalSteps.includes(step.id));
            
            saveState();
            renderGrid();
            elements.dayModal.classList.remove("active");
            showToast(`Day ${info.dayNum} status updated.`);
            
            if (state.googleScriptUrl) {
                pushToCloudSilently();
            }
        };
        
        elements.dayModal.classList.add("active");
    }

    elements.modalCloseBtn.addEventListener("click", () => elements.dayModal.classList.remove("active"));
    elements.modalCancelBtn.addEventListener("click", () => elements.dayModal.classList.remove("active"));

    // --- 11. SHOPPING LIST & INVENTORY ---
    function renderInventory(filter = "all") {
        elements.inventoryTableBody.innerHTML = "";
        
        let procuredCount = 0;
        
        INVENTORY_ITEMS.forEach(item => {
            const status = state.inventory.find(i => i.id === item.id) || { purchased: false };
            
            if (status.purchased) {
                procuredCount++;
            }
            
            // Filter match
            if (filter !== "all" && item.category !== filter) return;
            
            const tr = document.createElement("tr");
            
            const tdCheck = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "inventory-checkbox";
            checkbox.checked = status.purchased;
            checkbox.addEventListener("change", () => {
                status.purchased = checkbox.checked;
                saveState();
                renderInventory(filter);
                showToast("Procurement status updated.");
            });
            tdCheck.appendChild(checkbox);
            tr.appendChild(tdCheck);
            
            const tdItem = document.createElement("td");
            if (item.link) {
                tdItem.innerHTML = `<a href="${item.link}" target="_blank" style="color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:0.25rem;">${item.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem; color:var(--text-secondary);"></i></a>`;
            } else {
                tdItem.textContent = item.name;
            }
            tr.appendChild(tdItem);
            
            const tdType = document.createElement("td");
            let badgeClass = "badge-source own";
            if (item.source === "buy") badgeClass = "badge-source buy";
            if (item.source === "kitchen") badgeClass = "badge-source kitchen";
            tdType.innerHTML = `<span class="${badgeClass}">${item.source.toUpperCase()}</span>`;
            tr.appendChild(tdType);
            
            const tdPurpose = document.createElement("td");
            tdPurpose.style.fontSize = "0.85rem";
            tdPurpose.style.color = "var(--text-secondary)";
            tdPurpose.textContent = item.purpose;
            tr.appendChild(tdPurpose);
            
            elements.inventoryTableBody.appendChild(tr);
        });
        
        elements.budgetProcuredRatio.textContent = `${procuredCount}/${INVENTORY_ITEMS.length}`;
        const pct = Math.round((procuredCount / INVENTORY_ITEMS.length) * 100);
        elements.budgetProgressFill.style.width = `${pct}%`;
    }

    elements.inventoryFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            elements.inventoryFilters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderInventory(btn.getAttribute("data-filter"));
        });
    });

    // --- 12. LOCAL EXCEL FILES SYNC (SHEETJS) ---
    // Template creation & download
    elements.btnDownloadTemplate.addEventListener("click", () => {
        const rows = [];
        // headers
        rows.push(["Day", "Date", "Phase", "Routine Checklist", "Status", "Notes"]);
        
        for (let i = 0; i < 100; i++) {
            const info = getDayInfo(i);
            const routine = getRoutineForDay(i);
            const stepsList = routine.map(s => `[ ] ${s.title} (${s.time})`).join("\r\n");
            
            rows.push([
                `Day ${info.dayNum}`,
                info.dateStr,
                info.phase.title,
                stepsList,
                "Not Started",
                ""
            ]);
        }
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, "100-Day Plan Template");
        
        // Save file
        XLSX.writeFile(wb, "100_Day_Upgrade_Template.xlsx");
        showToast("Template downloaded.");
    });

    // Export Logs
    elements.btnExportExcel.addEventListener("click", () => {
        const rows = [["Day", "DateStr", "DateISO", "Phase", "CompletedSteps", "Notes", "Status"]];
        
        for (let i = 0; i < 100; i++) {
            const info = getDayInfo(i);
            const key = `day_${i}`;
            const log = state.logs[key] || { completedSteps: [], notes: "", completed: false };
            
            rows.push([
                info.dayNum,
                info.dateStr,
                info.dateObj ? info.dateObj.toISOString().substring(0,10) : "",
                info.phase.title,
                log.completedSteps.join(","),
                log.notes,
                log.completed ? "Completed" : (log.completedSteps.length > 0 ? "In Progress" : "Pending")
            ]);
        }
        
        // Inventory Tab sheet
        const invRows = [["Item ID", "Item Name", "Category", "Source", "Purchased"]];
        INVENTORY_ITEMS.forEach(item => {
            const status = state.inventory.find(i => i.id === item.id) || { purchased: false };
            invRows.push([
                item.id,
                item.name,
                item.category,
                item.source,
                status.purchased ? "YES" : "NO"
            ]);
        });
        
        // Metadata / Config sheet
        const configRows = [
            ["Config Parameter", "Value"],
            ["Start Date", state.startDate || ""],
            ["Google Script URL", state.googleScriptUrl || ""],
            ["Export Timestamp", new Date().toLocaleString()]
        ];
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), "Daily Tracking Logs");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(invRows), "Inventory Status");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(configRows), "App Configuration");
        
        XLSX.writeFile(wb, "100_Day_Upgrade_Tracker.xlsx");
        showToast("Tracking logs exported successfully.");
    });

    // Drag and Drop Excel Import
    elements.excelDropzone.addEventListener("click", () => elements.excelFileInput.click());
    
    elements.excelDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        elements.excelDropzone.classList.add("dragover");
    });

    elements.excelDropzone.addEventListener("dragleave", () => {
        elements.excelDropzone.classList.remove("dragover");
    });

    elements.excelDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        elements.excelDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleExcelFile(e.dataTransfer.files[0]);
        }
    });

    elements.excelFileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleExcelFile(e.target.files[0]);
        }
    });

    function handleExcelFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // We parse sheet logs
                const logsSheet = workbook.Sheets["Daily Tracking Logs"];
                const invSheet = workbook.Sheets["Inventory Status"];
                const configSheet = workbook.Sheets["App Configuration"];
                
                if (!logsSheet) {
                    showToast("Invalid Excel format. Missing 'Daily Tracking Logs' sheet.", false);
                    return;
                }
                
                // Parse Config
                if (configSheet) {
                    const confArr = XLSX.utils.sheet_to_json(configSheet, { header: 1 });
                    confArr.forEach(row => {
                        if (row[0] === "Start Date" && row[1]) {
                            // Excel sometimes reads dates as floats, or standard ISO strings
                            let dateVal = row[1];
                            if (typeof dateVal === 'number') {
                                // Serial date
                                dateVal = new Date((dateVal - 25569) * 86400 * 1000).toISOString().substring(0, 10);
                            }
                            state.startDate = String(dateVal).trim();
                        }
                        if (row[0] === "Google Script URL" && row[1]) {
                            state.googleScriptUrl = String(row[1]).trim();
                            elements.inputScriptUrl.value = state.googleScriptUrl;
                        }
                    });
                }
                
                // Parse Logs
                const logsArr = XLSX.utils.sheet_to_json(logsSheet);
                logsArr.forEach(row => {
                    // headers: Day, DateStr, DateISO, Phase, CompletedSteps, Notes, Status
                    // Day contains the day number (1-100)
                    const dayNum = parseInt(row["Day"]);
                    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 100) {
                        const dayIndex = dayNum - 1;
                        const key = `day_${dayIndex}`;
                        
                        const completedSteps = row["CompletedSteps"] ? String(row["CompletedSteps"]).split(",").filter(s => s.trim().length > 0) : [];
                        const notes = row["Notes"] || "";
                        const completed = row["Status"] === "Completed";
                        
                        state.logs[key] = {
                            completedSteps,
                            notes,
                            completed
                        };
                    }
                });
                
                // Parse Inventory
                if (invSheet) {
                    const invArr = XLSX.utils.sheet_to_json(invSheet);
                    invArr.forEach(row => {
                        const id = row["Item ID"];
                        const purchased = row["Purchased"] === "YES";
                        const itemState = state.inventory.find(i => i.id === id);
                        if (itemState) {
                            itemState.purchased = purchased;
                        }
                    });
                }
                
                saveState();
                updateHUD();
                renderGrid();
                showToast("Excel spreadsheet imported successfully!");
            } catch (err) {
                console.error(err);
                showToast("Failed to parse Excel file.", false);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    // --- 13. CLOUD SYNC SECTION (GOOGLE SHEETS) ---
    // Apps Script code display
    const rawAppsScript = `/**
 * Google Apps Script Proxy for 100-Day Upgrade Dashboard
 * Allows reading and writing tracker logs to a single cell or formatted sheets.
 */
function doGet(e) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var dbSheet = doc.getSheetByName("DB_STORE") || doc.insertSheet("DB_STORE");
  
  // Read raw database json from A1
  var rawJson = dbSheet.getRange(1, 1).getValue();
  
  return ContentService.createTextOutput(rawJson || "{}")
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  
  // CORS options preflight handler fallback
  if (!e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var payload = JSON.parse(e.postData.contents);
  var appState = payload.state;
  
  // 1. Store Raw DB JSON in Cell A1
  var dbSheet = doc.getSheetByName("DB_STORE") || doc.insertSheet("DB_STORE");
  dbSheet.getRange(1, 1).setValue(JSON.stringify(appState));
  
  // 2. Expand human-readable Logs row-by-row
  var logSheet = doc.getSheetByName("Daily Logs") || doc.insertSheet("Daily Logs");
  logSheet.clear();
  logSheet.appendRow(["Day", "Date", "Completed Steps Count", "Steps Checked", "Notes", "Completed Status"]);
  
  // Sort logs by day number
  var keys = Object.keys(appState.logs).sort(function(a, b) {
    return parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]);
  });
  
  keys.forEach(function(key) {
    var dayIndex = parseInt(key.split('_')[1]);
    var dayNum = dayIndex + 1;
    var log = appState.logs[key];
    
    // Compute date if start date exists
    var dateStr = "N/A";
    if (appState.startDate) {
      var d = new Date(appState.startDate);
      d.setDate(d.getDate() + dayIndex);
      dateStr = d.toLocaleDateString();
    }
    
    logSheet.appendRow([
      "Day " + dayNum,
      dateStr,
      log.completedSteps.length,
      log.completedSteps.join(", "),
      log.notes,
      log.completed ? "COMPLETED" : "IN_PROGRESS"
    ]);
  });
  
  // 3. Expand human-readable Inventory checklist
  var invSheet = doc.getSheetByName("Inventory Checklist") || doc.insertSheet("Inventory Checklist");
  invSheet.clear();
  invSheet.appendRow(["Item ID", "Purchased Status"]);
  appState.inventory.forEach(function(item) {
    invSheet.appendRow([item.id, item.purchased ? "OWNED / BOUGHT" : "PENDING"]);
  });
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success", timestamp: new Date().getTime() }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

    if (elements.scriptCodeContent) {
        elements.scriptCodeContent.textContent = rawAppsScript;
    }

    elements.btnCopyCode.addEventListener("click", () => {
        navigator.clipboard.writeText(rawAppsScript).then(() => {
            elements.btnCopyCode.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;
            setTimeout(() => {
                elements.btnCopyCode.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
            }, 2000);
            showToast("Apps Script code copied to clipboard.");
        }).catch(err => {
            showToast("Failed to copy code automatically.", false);
        });
    });

    elements.inputScriptUrl.addEventListener("input", (e) => {
        state.googleScriptUrl = e.target.value.trim();
        saveState();
        validateCloudStatus();
    });

    function validateCloudStatus() {
        if (state.googleScriptUrl) {
            elements.cloudSyncStatus.className = "sync-status connected";
            elements.cloudStatusText.textContent = "URL Set";
        } else {
            elements.cloudSyncStatus.className = "sync-status disconnected";
            elements.cloudStatusText.textContent = "Disconnected";
        }
    }

    // Pull from cloud
    elements.btnCloudPull.addEventListener("click", async () => {
        if (!state.googleScriptUrl) {
            showToast("Please input your Google Apps Script URL first.", false);
            return;
        }
        
        elements.btnCloudPull.disabled = true;
        elements.btnCloudPull.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Pulling...`;
        
        try {
            // Google Apps Script doGet redirects, fetch handles it automatically
            const response = await fetch(state.googleScriptUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            
            const cloudState = await response.json();
            if (cloudState && Object.keys(cloudState).length > 0) {
                // Merge cloud state into local state
                if (cloudState.startDate) state.startDate = cloudState.startDate;
                if (cloudState.logs) state.logs = { ...state.logs, ...cloudState.logs };
                if (cloudState.inventory) state.inventory = cloudState.inventory;
                
                saveState();
                updateHUD();
                renderGrid();
                showToast("Data pulled from Google Sheets successfully!");
            } else {
                showToast("No data found in cloud. Try Pushing your local data first.", false);
            }
        } catch (err) {
            console.error(err);
            showToast("Pull failed. Verify your Web App URL deployment.", false);
        } finally {
            elements.btnCloudPull.disabled = false;
            elements.btnCloudPull.innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> Pull Data`;
        }
    });

    // Push to cloud
    elements.btnCloudPush.addEventListener("click", async () => {
        await pushToCloud();
    });

    async function pushToCloud() {
        if (!state.googleScriptUrl) {
            showToast("Please input your Google Apps Script URL first.", false);
            return;
        }
        
        elements.btnCloudPush.disabled = true;
        elements.btnCloudPush.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Pushing...`;
        
        try {
            // We use standard fetch POST to push the data
            const response = await fetch(state.googleScriptUrl, {
                method: "POST",
                mode: "no-cors", // Apps Script doPost often returns redirects which fail CORS check but write successfully
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ state: state })
            });
            
            // Because of no-cors mode, fetch response might be opaque, so we assume success if no error is thrown
            showToast("Data pushed to Google Sheets successfully!");
        } catch (err) {
            console.error(err);
            showToast("Push failed. Check your network or URL.", false);
        } finally {
            elements.btnCloudPush.disabled = false;
            elements.btnCloudPush.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Push Data`;
        }
    }

    async function pushToCloudSilently() {
        if (!state.googleScriptUrl) return;
        try {
            await fetch(state.googleScriptUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state: state })
            });
        } catch (err) {
            console.warn("Silent cloud push failed", err);
        }
    }

    // --- 14. ONBOARDING & SETUP ---
    elements.setupStartBtn.addEventListener("click", () => {
        const val = elements.setupStartDate.value;
        if (!val) {
            showToast("Please select a valid date to start.", false);
            return;
        }
        
        state.startDate = val;
        // Initialize empty logs if resetting
        if (Object.keys(state.logs).length === 0) {
            for (let i = 0; i < 100; i++) {
                state.logs[`day_${i}`] = { completedSteps: [], notes: "", completed: false };
            }
        }
        
        saveState();
        updateHUD();
        renderGrid();
        
        elements.setupModal.classList.remove("active");
        showToast("100-Day Personal Upgrade initialized!");
        
        // Jump to current active day index
        state.selectedDayIndex = getActiveDayIndex();
        loadTrackerDay(state.selectedDayIndex);
        
        if (state.googleScriptUrl) {
            pushToCloudSilently();
        }
    });

    // --- 15. FIRST RUN ON INITIALIZATION ---
    const hasData = loadState();
    updateHUD();
    
    // Set selected index to current active day index
    state.selectedDayIndex = getActiveDayIndex();
    
    validateCloudStatus();
    if (state.googleScriptUrl) {
        elements.inputScriptUrl.value = state.googleScriptUrl;
    }
    
    if (!state.startDate) {
        // First run: show onboarding setup modal
        elements.setupStartDate.value = new Date().toISOString().substring(0, 10);
        elements.setupModal.classList.add("active");
    } else {
        renderGrid();
        loadTrackerDay(state.selectedDayIndex);
    }
});
