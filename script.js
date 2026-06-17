document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileNav() {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // --- GitHub API Integration ---
    const username = 'ISMAIL0112358';
    const gitAvatar = document.getElementById('gitAvatar');
    const gitName = document.getElementById('gitName');
    const gitBio = document.getElementById('gitBio');
    const gitRepos = document.getElementById('gitRepos');
    const gitFollowers = document.getElementById('gitFollowers');
    const gitLocation = document.getElementById('gitLocation');
    const githubContent = document.getElementById('githubContent');
    const githubStatsCard = document.getElementById('githubStatsCard');

    // High-quality local fallback in case GitHub API is rate-limited
    const fallbackStats = {
        name: 'Ismail Taibani',
        bio: 'Senior Backend Engineer | Building AI-Integrated High-Throughput Systems, MCP Servers, and RAG Pipelines.',
        public_repos: 12,
        followers: 18,
        location: 'Mumbai, India',
        avatar_url: 'https://avatars.githubusercontent.com/u/41648074?v=4'
    };

    function updateGitHubUI(data) {
        if (gitAvatar) gitAvatar.src = data.avatar_url;
        if (gitName) gitName.textContent = data.name || username;
        if (gitBio) gitBio.textContent = data.bio || 'Senior Backend & AI Engineer';
        if (gitRepos) gitRepos.textContent = data.public_repos;
        if (gitFollowers) gitFollowers.textContent = data.followers;
        if (gitLocation) gitLocation.textContent = data.location || 'Mumbai, India';

        // Swap spinner for content
        const loader = githubStatsCard.querySelector('.github-loading');
        if (loader) loader.classList.add('hidden');
        if (githubContent) githubContent.classList.remove('hidden');
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) throw new Error('GitHub API rate limit or error');
            return response.json();
        })
        .then(data => {
            updateGitHubUI(data);
        })
        .catch(err => {
            console.warn('Using fallback GitHub statistics:', err);
            updateGitHubUI(fallbackStats);
        });

    // --- CrewAI & RAG Simulator ---
    const scenarios = {
        'ad-crew': {
            query: 'Analyze performance of campaigns in Google Ads & Meta, identify underperforming audiences, and redistribute budget.',
            agents: {
                agent1: { name: 'Audience Analyzer', icon: 'search' },
                rag: { name: 'Vector DB RAG', icon: 'database' },
                agent2: { name: 'Budget Strategist', icon: 'edit-3' }
            },
            logs: [
                { text: '[SYSTEM] Booting CrewAI agent pipeline: "Ad Campaign Optimizer Crew"', type: 'muted' },
                { text: '[SYSTEM] Active Agents: [Audience Analyzer, Budget Strategist]', type: 'muted' },
                { text: '[SYSTEM] Active Tools: [Vector Retriever, Google Ads MCP, Meta Ads MCP]', type: 'muted' },
                { text: '[Agent: Audience Analyzer] Initiating conversion and CTR analysis across platforms...', type: 'cyan' },
                { text: '[Tool: Google Ads MCP] Fetching campaign stats for account ID 842-***-9921...', type: 'purple' },
                { text: '[Tool: Vector DB] Performing semantic hybrid search on vector store index "ad_performance_benchmarks"...', type: 'purple' },
                { text: '[Tool: Vector DB] Context Match found: "e-commerce ROI threshold guidelines Q3" (similarity: 0.94)', type: 'green' },
                { text: '[Agent: Audience Analyzer] Analyzed Meta campaign metrics. Identified 2 underperforming lookalike ad groups (ROI < 1.2) in "Meta_Prospecting_Q2".', type: 'cyan' },
                { text: '[SYSTEM] Handing over context data payload to Budget Strategist Agent...', type: 'muted' },
                { text: '[Agent: Budget Strategist] Calculating optimal budget distribution based on retrieval guidelines...', type: 'cyan' },
                { text: '[Tool: Meta Ads MCP] Executing budget adjustment: target="meta_9912", adjust_budget=-$450/day (Success)', type: 'purple' },
                { text: '[Tool: Google Ads MCP] Executing budget adjustment: target="gads_3412", adjust_budget=+$450/day (Success)', type: 'purple' },
                { text: '[SYSTEM] Writing execution log details to central engine...', type: 'muted' },
                { text: '[SYSTEM] Batch execution succeeded (idempotency token: pixis_exec_3489ae21f)', type: 'green' }
            ],
            output: 'Successfully optimized budget across 6 campaigns. Transferred $450/day from underperforming Meta lookalike audiences to high-converting Google Search campaigns. Platform API latency: 14ms.'
        },
        'rag-audit': {
            query: 'Audit recent pull request for vulnerable Django Channels WebSocket routing setups and document security holes.',
            agents: {
                agent1: { name: 'Static Code Analyst', icon: 'search' },
                rag: { name: 'RAG Security Index', icon: 'database' },
                agent2: { name: 'Security Auditor', icon: 'edit-3' }
            },
            logs: [
                { text: '[SYSTEM] Booting CrewAI agent pipeline: "Codebase Security Auditor Crew"', type: 'muted' },
                { text: '[SYSTEM] Active Agents: [Static Analyst, Security Auditor]', type: 'muted' },
                { text: '[SYSTEM] Active Tools: [MCP File System Reader, RAG Security Index]', type: 'muted' },
                { text: '[Agent: Static Analyst] Scanning repository directories for WebSocket router setups...', type: 'cyan' },
                { text: '[Tool: MCP File Reader] Reading contents of files: "routing.py" and "consumers.py"...', type: 'purple' },
                { text: '[Tool: Vector DB] Querying semantic vector index "owasp_channels_security_standards"...', type: 'purple' },
                { text: '[Tool: Vector DB] Match found: "Django Channels Connection Authentication Patterns" (similarity: 0.89)', type: 'green' },
                { text: '[Agent: Static Analyst] Flagged class ChatConsumer (consumers.py:L14) missing token validation in connect() hook.', type: 'cyan' },
                { text: '[SYSTEM] Passing vulnerability context report to Security Auditor...', type: 'muted' },
                { text: '[Agent: Security Auditor] Assessing exploit risk and writing mitigation blocks...', type: 'cyan' },
                { text: '[Agent: Security Auditor] Self-correction check: validated recommendation against standard TokenAuthMiddleware patterns.', type: 'cyan' },
                { text: '[SYSTEM] Generating audit summary documentation...', type: 'green' }
            ],
            output: 'Vulnerability Detected: WebSocket route "/ws/chat/" (consumers.py) bypasses Django AuthMiddlewareStack validation. Risk level: HIGH. Mitigation: Implement token query parsing in connection handler.'
        },
        'mcp-sync': {
            query: 'Sync conversion pixel actions from Google Analytics to TikTok and LinkedIn campaigns.',
            agents: {
                agent1: { name: 'Schema Align Router', icon: 'search' },
                rag: { name: 'OAuth Token Vault', icon: 'database' },
                agent2: { name: 'Sync Audit Agent', icon: 'edit-3' }
            },
            logs: [
                { text: '[SYSTEM] Booting CrewAI agent pipeline: "Multi-Platform Ad Sync Crew"', type: 'muted' },
                { text: '[SYSTEM] Active Agents: [Schema Router, Sync Auditor]', type: 'muted' },
                { text: '[SYSTEM] Active Tools: [MCP API Gateway, Token Management Auth]', type: 'muted' },
                { text: '[Agent: Schema Router] Mapping custom GA conversion event schemas to platform pixel specifications...', type: 'cyan' },
                { text: '[Tool: Token Management Auth] Querying OAuth vault for valid TikTok platform tokens...', type: 'purple' },
                { text: '[Tool: Token Management Auth] Refreshing expired token for account "ismail_taibani_pixis" (Success)', type: 'green' },
                { text: '[Agent: Schema Router] Aligned fields: "transaction_value" -> "value" and "currency" -> "currency" for API payload schema.', type: 'cyan' },
                { text: '[SYSTEM] Relaying sync data payload to Sync Audit Agent...', type: 'muted' },
                { text: '[Agent: Sync Auditor] Dispatching conversion event batches to endpoints...', type: 'cyan' },
                { text: '[Tool: MCP API Gateway] POST https://ads-api.tiktok.com/pixel/track -> 200 OK (50 events)', type: 'purple' },
                { text: '[Tool: MCP API Gateway] POST https://api.linkedin.com/conversion -> 200 OK (50 events)', type: 'purple' },
                { text: '[Agent: Sync Auditor] verified transaction integrity. All API actions completed.', type: 'cyan' },
                { text: '[SYSTEM] Schema alignments & sync report validated successfully.', type: 'green' }
            ],
            output: 'Synced Google Analytics "purchase" triggers to TikTok & LinkedIn pixels. Events pushed: 100. Schema parity: 100%. OAuth security tokens validated successfully.'
        }
    };

    const select = document.getElementById('scenarioSelect');
    const runBtn = document.getElementById('btnRunSimulation');
    const clearBtn = document.getElementById('btnClearLogs');
    const queryText = document.getElementById('queryText');
    const outputText = document.getElementById('outputText');
    const terminalLogs = document.getElementById('terminalLogs');

    const agent1Node = document.getElementById('agent1');
    const ragNode = document.getElementById('ragNode');
    const agent2Node = document.getElementById('agent2');
    const connector1 = document.getElementById('connector1');
    const connector2 = document.getElementById('connector2');

    let simIntervals = [];
    let isSimRunning = false;

    // Reset visual nodes
    function resetSimulatorUI() {
        // Clear nodes states
        [agent1Node, ragNode, agent2Node].forEach(node => {
            node.classList.remove('active', 'completed');
            node.querySelector('.agent-status-badge').textContent = 'Idle';
            node.querySelector('.agent-status-badge').style.background = 'rgba(255, 255, 255, 0.05)';
            node.querySelector('.agent-status-badge').style.color = 'var(--text-secondary)';
        });
        ragNode.querySelector('.agent-status-badge').textContent = 'Ready';

        // Clear connectors
        connector1.classList.remove('active');
        connector2.classList.remove('active');

        // Clear outputs
        outputText.textContent = 'Waiting for execution...';
        outputText.classList.remove('active-result');

        // Clear intervals
        simIntervals.forEach(clearTimeout);
        simIntervals = [];
        isSimRunning = false;
        runBtn.disabled = false;
        runBtn.innerHTML = `<i data-lucide="play"></i> <span>Execute Agent Crew</span>`;
        lucide.createIcons();
    }

    // Load initial scenario details
    function loadScenarioDetails() {
        if (isSimRunning) resetSimulatorUI();
        const activeKey = select.value;
        const currentData = scenarios[activeKey];

        queryText.textContent = currentData.query;
        
        // Update labels on agents
        agent1Node.querySelector('.agent-name').textContent = `Agent 1: ${currentData.agents.agent1.name}`;
        agent1Node.querySelector('.agent-avatar').innerHTML = `<i data-lucide="${currentData.agents.agent1.icon}"></i>`;
        
        ragNode.querySelector('.agent-name').textContent = currentData.agents.rag.name;
        ragNode.querySelector('.agent-avatar').innerHTML = `<i data-lucide="${currentData.agents.rag.icon}"></i>`;
        
        agent2Node.querySelector('.agent-name').textContent = `Agent 2: ${currentData.agents.agent2.name}`;
        agent2Node.querySelector('.agent-avatar').innerHTML = `<i data-lucide="${currentData.agents.agent2.icon}"></i>`;
        
        lucide.createIcons();
    }

    if (select) {
        select.addEventListener('change', loadScenarioDetails);
        // Initial load
        loadScenarioDetails();
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            terminalLogs.innerHTML = `<div class="log-line text-muted">&gt; Logs cleared. Choose a scenario and run the crew simulation.</div>`;
        });
    }

    function addLogLine(text, type) {
        const line = document.createElement('div');
        line.className = `log-line text-${type}`;
        line.textContent = `> ${text}`;
        terminalLogs.appendChild(line);
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            if (isSimRunning) return;
            isSimRunning = true;
            runBtn.disabled = true;
            runBtn.innerHTML = `<span class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></span> <span>Running...</span>`;

            const currentData = scenarios[select.value];

            // Reset visual states first
            [agent1Node, ragNode, agent2Node].forEach(node => {
                node.classList.remove('active', 'completed');
                node.querySelector('.agent-status-badge').textContent = 'Idle';
            });
            ragNode.querySelector('.agent-status-badge').textContent = 'Ready';
            connector1.classList.remove('active');
            connector2.classList.remove('active');
            outputText.textContent = 'Agent Crew processing...';
            outputText.classList.remove('active-result');

            // Clear terminal for a fresh simulation run
            terminalLogs.innerHTML = '';
            addLogLine(`Initializing multi-agent graph simulation: ${select.value}...`, 'muted');

            // Timed Simulation Pipeline
            let timeAccumulator = 600;

            // Step 1: Start Agent 1 (Researcher)
            const t1 = setTimeout(() => {
                agent1Node.classList.add('active');
                agent1Node.querySelector('.agent-status-badge').textContent = 'Active';
                agent1Node.querySelector('.agent-status-badge').style.background = 'rgba(6, 182, 212, 0.2)';
                agent1Node.querySelector('.agent-status-badge').style.color = 'var(--accent-cyan)';
                
                // Add initial logs
                addLogLine(currentData.logs[0].text, currentData.logs[0].type);
                addLogLine(currentData.logs[1].text, currentData.logs[1].type);
                addLogLine(currentData.logs[2].text, currentData.logs[2].type);
            }, timeAccumulator);
            simIntervals.push(t1);

            timeAccumulator += 1500;

            // Step 2: Agent 1 executes scan/research
            const t2 = setTimeout(() => {
                addLogLine(currentData.logs[3].text, currentData.logs[3].type);
                addLogLine(currentData.logs[4].text, currentData.logs[4].type);
            }, timeAccumulator);
            simIntervals.push(t2);

            timeAccumulator += 1800;

            // Step 3: Trigger Connector 1 & Vector RAG tool
            const t3 = setTimeout(() => {
                connector1.classList.add('active');
                ragNode.classList.add('active');
                ragNode.querySelector('.agent-status-badge').textContent = 'Searching';
                ragNode.querySelector('.agent-status-badge').style.background = 'rgba(168, 85, 247, 0.2)';
                ragNode.querySelector('.agent-status-badge').style.color = 'var(--accent-purple)';

                addLogLine(currentData.logs[5].text, currentData.logs[5].type);
                addLogLine(currentData.logs[6].text, currentData.logs[6].type);
            }, timeAccumulator);
            simIntervals.push(t3);

            timeAccumulator += 2000;

            // Step 4: Complete Agent 1 research output
            const t4 = setTimeout(() => {
                agent1Node.classList.remove('active');
                agent1Node.classList.add('completed');
                agent1Node.querySelector('.agent-status-badge').textContent = 'Completed';
                agent1Node.querySelector('.agent-status-badge').style.background = 'rgba(16, 185, 129, 0.2)';
                agent1Node.querySelector('.agent-status-badge').style.color = 'var(--accent-emerald)';

                ragNode.classList.remove('active');
                ragNode.classList.add('completed');
                ragNode.querySelector('.agent-status-badge').textContent = 'Matched';
                ragNode.querySelector('.agent-status-badge').style.background = 'rgba(16, 185, 129, 0.2)';
                ragNode.querySelector('.agent-status-badge').style.color = 'var(--accent-emerald)';

                addLogLine(currentData.logs[7].text, currentData.logs[7].type);
                addLogLine(currentData.logs[8].text, currentData.logs[8].type);
            }, timeAccumulator);
            simIntervals.push(t4);

            timeAccumulator += 1200;

            // Step 5: Trigger Connector 2 & Agent 2 (Strategist/Writer)
            const t5 = setTimeout(() => {
                connector2.classList.add('active');
                agent2Node.classList.add('active');
                agent2Node.querySelector('.agent-status-badge').textContent = 'Active';
                agent2Node.querySelector('.agent-status-badge').style.background = 'rgba(6, 182, 212, 0.2)';
                agent2Node.querySelector('.agent-status-badge').style.color = 'var(--accent-cyan)';

                addLogLine(currentData.logs[9].text, currentData.logs[9].type);
                addLogLine(currentData.logs[10].text, currentData.logs[10].type);
            }, timeAccumulator);
            simIntervals.push(t5);

            timeAccumulator += 1800;

            // Step 6: Agent 2 finishes work & tool runs
            const t6 = setTimeout(() => {
                addLogLine(currentData.logs[11].text, currentData.logs[11].type);
                if (currentData.logs[12]) addLogLine(currentData.logs[12].text, currentData.logs[12].type);
                if (currentData.logs[13]) addLogLine(currentData.logs[13].text, currentData.logs[13].type);
            }, timeAccumulator);
            simIntervals.push(t6);

            timeAccumulator += 1500;

            // Step 7: Completed Crew Run
            const t7 = setTimeout(() => {
                agent2Node.classList.remove('active');
                agent2Node.classList.add('completed');
                agent2Node.querySelector('.agent-status-badge').textContent = 'Completed';
                agent2Node.querySelector('.agent-status-badge').style.background = 'rgba(16, 185, 129, 0.2)';
                agent2Node.querySelector('.agent-status-badge').style.color = 'var(--accent-emerald)';

                addLogLine('[SYSTEM] Multi-Agent graph pipeline execution completed.', 'green');

                // Output Result text
                outputText.textContent = currentData.output;
                outputText.classList.add('active-result');

                // Reset Execute button
                isSimRunning = false;
                runBtn.disabled = false;
                runBtn.innerHTML = `<i data-lucide="play"></i> <span>Execute Agent Crew</span>`;
                lucide.createIcons();
            }, timeAccumulator);
            simIntervals.push(t7);
        });
    }

    // --- Copy to Clipboard Social Links ---
    const copyLinks = document.querySelectorAll('.copy-link');
    copyLinks.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const val = btn.getAttribute('data-copy');
            
            // Copy to Clipboard
            navigator.clipboard.writeText(val).then(() => {
                // Update tooltip text temporarily to show "Copied!"
                const tooltip = btn.querySelector('.tooltip-text');
                const originalText = tooltip.textContent;
                
                tooltip.textContent = `Copied: ${val}`;
                btn.classList.add('show-tooltip');
                
                // Hide tooltip after 2.5 seconds
                setTimeout(() => {
                    btn.classList.remove('show-tooltip');
                    // Reset text back after transition ends
                    setTimeout(() => {
                        tooltip.textContent = originalText;
                    }, 200);
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy to clipboard:', err);
            });
        });
    });
});
