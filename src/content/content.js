(async () => {
    const { enabled } = await chrome.storage.sync.get('enabled');
    if (!enabled) return;

// Global değişken - assigned issues verilerini saklamak için
let assignedIssues = [];

// CSS stillerini ekle
function addStyles(position = 'left') {
    // Eski stil elementi varsa kaldır
    const existingStyle = document.getElementById('floating-your-work-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'floating-your-work-styles';

    // Pozisyona göre stil ayarları
    const positionStyles = position === 'right' ?
        'bottom: 60px; right: 20px;' :
        'bottom: 60px; left: 20px;';

    const dropdownPosition = position === 'right' ?
        'bottom: 100%; right: 0; margin-bottom: 15px;' :
        'bottom: 100%; left: 0; margin-bottom: 15px;';

    style.textContent = `
        .floating-your-work {
            position: fixed;
            ${positionStyles}
            z-index: 9999;
        }

        .floating-button {
            background: linear-gradient(135deg, #0052cc, #0747a6);
            border: none;
            color: white;
            padding: 14px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 8px 32px rgba(0, 82, 204, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .floating-button:hover {
            background: linear-gradient(135deg, #0747a6, #065aa6);
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 12px 40px rgba(0, 82, 204, 0.4);
        }

        .floating-button:active {
            transform: translateY(-2px) scale(1.02);
        }

        .floating-dropdown {
            position: absolute;
            ${dropdownPosition}
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            width: 380px;
            max-height: 450px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            display: none;
            animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #floating-dropdown-items {
            max-height: 350px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .floating-dropdown.show {
            display: block;
        }

        .dropdown-header {
            padding: 16px 18px;
            background: linear-gradient(135deg, #0052cc, #0747a6);
            color: white;
            font-weight: 600;
            font-size: 15px;
            border-radius: 16px 16px 0 0;
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
        }

        .dropdown-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        .dropdown-item {
            padding: 10px 18px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            cursor: pointer;
            color: #333;
            transition: all 0.2s ease;
            position: relative;
            display: block;
            text-decoration: none;
        }

        .dropdown-item:hover {
            background: linear-gradient(135deg, #f8f9ff, #f0f4ff);
            transform: translateX(4px);
            color: #333;
            text-decoration: none;
        }

        .dropdown-item:visited {
            color: #333;
        }

        .dropdown-item:active {
            color: #333;
        }

        .dropdown-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            background: linear-gradient(135deg, #0052cc, #0747a6);
            transition: width 0.3s ease;
        }

        .dropdown-item:hover::before {
            width: 4px;
        }

        .issue-key {
            font-weight: 700;
            color: #0052cc;
            margin-right: 8px;
            font-size: 12px;
            background: rgba(0, 82, 204, 0.1);
            padding: 1px 6px;
            border-radius: 4px;
        }

        .issue-summary {
            color: #172b4d;
            margin-bottom: 6px;
            font-size: 13px;
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
        }

        .issue-meta {
            font-size: 11px;
            color: #6b778c;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }

        .issue-status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
        }

        .status-category-1 {
            background: linear-gradient(135deg, #e6f3ff, #cce7ff);
            color: #0052cc;
            border: 1px solid rgba(0, 82, 204, 0.2);
        }
        .status-category-2 {
            background: linear-gradient(135deg, #fff7e6, #ffe6b3);
            color: #ff8b00;
            border: 1px solid rgba(255, 139, 0, 0.2);
        }
        .status-category-3 {
            background: linear-gradient(135deg, #e6ffed, #ccf2d9);
            color: #00875a;
            border: 1px solid rgba(0, 135, 90, 0.2);
        }
        .status-category-4 {
            background: linear-gradient(135deg, #0052cc, #0747a6);
            color: #ffffff;
            border: 1px solid rgba(0, 82, 204, 0.3);
        }

        .project-name {
            font-weight: 600;
            color: #505f79;
            background: rgba(80, 95, 121, 0.1);
            padding: 1px 6px;
            border-radius: 4px;
            font-size: 11px;
        }

        .issue-type {
            color: #6b778c;
            font-style: italic;
        }

        .no-issues {
            padding: 20px;
            text-align: center;
            color: #6b778c;
            font-style: italic;
        }

        .floating-your-work.refreshing .floating-button {
            opacity: 0.7;
            transform: scale(0.95);
        }

        .floating-your-work.refreshing .floating-button::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .floating-your-work.slide-in {
            animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(${position === 'right' ? '100px' : '-100px'}) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateX(0) scale(1);
            }
        }

        /* Loading States */
        .floating-button.loading {
            opacity: 0.8;
            pointer-events: none;
        }

        .floating-button.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .loading-state {
            padding: 30px 20px;
            text-align: center;
            color: #6b778c;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #0052cc;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }

        .loading-text {
            font-size: 14px;
            color: #6b778c;
            font-weight: 500;
        }

        /* Error States */
        .error-state {
            padding: 30px 20px;
            text-align: center;
            color: #6b778c;
        }

        .error-icon {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.7;
        }

        .error-text {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 20px;
            color: #172b4d;
        }

        .retry-button {
            background: linear-gradient(135deg, #0052cc, #0747a6);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
        }

        .retry-button:hover {
            background: linear-gradient(135deg, #0747a6, #065aa6);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 82, 204, 0.4);
        }

        /* Issue Count Badge */
        .issue-count {
            background: linear-gradient(135deg, #ff5630, #ff8566);
            color: white;
            border-radius: 50%;
            padding: 4px 7px;
            font-size: 12px;
            font-weight: 700;
            min-width: 18px;
            height: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-left: 6px;
            box-shadow: 0 2px 8px rgba(255, 86, 48, 0.3);
        }

        .dropdown-footer {
            padding: 12px 18px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            text-align: center;
            font-size: 11px;
            color: #6b778c;
            border-radius: 0 0 16px 16px;
            font-weight: 500;
        }

        /* Scrollbar styling */
        #floating-dropdown-items::-webkit-scrollbar {
            width: 4px;
        }

        #floating-dropdown-items::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.02);
            border-radius: 10px;
        }

        #floating-dropdown-items::-webkit-scrollbar-thumb {
            background: rgba(0, 82, 204, 0.3);
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        #floating-dropdown-items::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 82, 204, 0.6);
            transform: scaleX(1.2);
        }

        /* Firefox scrollbar styling */
        #floating-dropdown-items {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 82, 204, 0.3) rgba(0, 0, 0, 0.02);
        }
    `;

    document.head.appendChild(style);
}

// Floating button'ı oluştur
function createFloatingButton() {
    const container = document.createElement('div');
    container.className = 'floating-your-work';
    container.id = 'floating-your-work';

    const issueCount = assignedIssues ? assignedIssues.length : 0;
    const countBadge = issueCount > 0 ? `<span class="issue-count">${issueCount}</span>` : '';

    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    container.innerHTML = `
        <button id="floating-work-btn" class="floating-button">
            <svg width="16" height="16" viewBox="0 0 24 24" style="fill: currentColor;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Your Work</span>
            ${countBadge}
        </button>
        <div id="floating-dropdown" class="floating-dropdown">
            <div class="dropdown-header">
                <svg width="16" height="16" viewBox="0 0 24 24" style="fill: currentColor;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Assigned to Me
                ${countBadge}
            </div>
            <div id="floating-dropdown-items"></div>
            <div class="dropdown-footer">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span>🔄 Son güncelleme: ${timeString}</span>
                    <button onclick="refreshAssignedIssues()" style="background: none; border: none; color: #0052cc; cursor: pointer; font-size: 12px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,82,204,0.1)'" onmouseout="this.style.background='none'">
                        Yenile
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    // Event listener'ları ekle
    addFloatingEvents();

    // İlk yüklemede content'i güncelle
    updateFloatingDropdownContent();

    // Middle click support ekle
    addMiddleClickSupport();
}

// Floating button olaylarını ekle
function addFloatingEvents() {
    const button = document.getElementById('floating-work-btn');
    const dropdown = document.getElementById('floating-dropdown');

    button.addEventListener('click', async function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');

        // Dropdown açıldığında yeni verileri çek
        if (dropdown.classList.contains('show')) {
            await refreshAssignedIssues();
        }
    });

    // Dropdown dışına tıklandığında kapat
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
        }
    });
}

// Floating dropdown içeriğini güncelle
function updateFloatingDropdownContent() {
    const dropdownItems = document.getElementById('floating-dropdown-items');

    if (!assignedIssues || assignedIssues.length === 0) {
        dropdownItems.innerHTML = `
            <div class="no-issues">
                <div class="no-issues-icon">✅</div>
                <strong>Harika!</strong><br>
                Size atanmış açık issue bulunmuyor.<br>
                Yeni görevler için beklemede kalabilirsiniz.
            </div>
        `;
        return;
    }

    let itemsHTML = '';

    assignedIssues.forEach(issue => {
        const statusClass = `status-category-${issue.status.statusCategoryId}`;
        const issueUrl = `${window.location.origin}/browse/${issue.issuekey.stringValue}`;

        itemsHTML += `
            <a href="${issueUrl}" class="dropdown-item" target="_self">
                <div class="issue-summary">
                    <span class="issue-key">${issue.issuekey.stringValue}</span>
                    ${issue.summary.textValue}
                </div>
                <div class="issue-meta">
                    <span class="issue-status ${statusClass}">${issue.status.name}</span>
                    <span class="project-name">${issue.project.name}</span>
                    <span class="issue-type">${issue.issuetype.name}</span>
                </div>
            </a>
        `;
    });

    dropdownItems.innerHTML = itemsHTML;

    // İlk content yüklemesinde middle click support eklenir, tekrar eklemeye gerek yok
}

// Assigned to Me verileri için GraphQL sorgusu
async function fetchAssignedIssues() {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/rest/gira/1/`;

    const query = {
        operationName: "navigationAssignedIssuesQuery",
        query: `query navigationAssignedIssuesQuery($first: Int!, $jql: String, $useIssueService: Boolean!, $isMaxResultsLimitEnabled: Boolean!) {
            issues(first: $first, jql: $jql, useIssueService: $useIssueService, isMaxResultsLimitEnabled: $isMaxResultsLimitEnabled) {
                edges {
                    node {
                        issueId
                        issuekey {
                            stringValue
                        }
                        summary {
                            textValue
                        }
                        project {
                            id
                            name
                        }
                        status {
                            statusCategoryId
                            name
                        }
                        issuetype {
                            id
                            name
                            iconUrl
                        }
                    }
                }
                totalCount
            }
        }`,
        variables: {
            first: 20,
            jql: "assignee = currentUser() AND statusCategory != 3 ORDER BY statusCategory DESC, updatedDate DESC",
            useIssueService: true,
            isMaxResultsLimitEnabled: true
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json,text/javascript,*/*',
                'Content-Type': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API isteği hatası:', error);
        return null;
    }
}

// Assigned to Me verilerini console'da göster
function displayAssignedIssues(data) {
    if (!data || !data.data || !data.data.issues) {
        console.log('Veri bulunamadı veya hata oluştu');
        return;
    }

    const issues = data.data.issues.edges;
    const totalCount = data.data.issues.totalCount;

    console.log(`\n=== ASSIGNED TO ME (${totalCount} toplam) ===`);
    console.log('─'.repeat(60));

    if (issues.length === 0) {
        console.log('Size atanmış açık issue bulunamadı.');
        return;
    }

    issues.forEach((edge, index) => {
        const issue = edge.node;
        console.log(`${index + 1}. ${issue.issuekey.stringValue} - ${issue.summary.textValue}`);
        console.log(`   📁 Proje: ${issue.project.name}`);
        console.log(`   🏷️  Durum: ${issue.status.name}`);
        console.log(`   📋 Tip: ${issue.issuetype.name}`);
        console.log('─'.repeat(60));
    });
}

// Floating button'ı yenile
function refreshFloatingButton() {
    const existingButton = document.getElementById('floating-your-work');
    if (existingButton) {
        existingButton.remove();
    }
    createFloatingButton();
}

// Yeni veri çekme ve güncelleme fonksiyonu
async function refreshAssignedIssues() {
    const dropdownItems = document.getElementById('floating-dropdown-items');
    const button = document.getElementById('floating-work-btn');

    // Loading state'i göster
    showLoadingState();

    try {
        console.log('🔄 Assigned to Me verileri yenileniyor...');

        // Yeni verileri çek
        const assignedData = await fetchAssignedIssues();

        if (assignedData && assignedData.data && assignedData.data.issues) {
            // Global değişkeni güncelle
            assignedIssues = assignedData.data.issues.edges.map(edge => edge.node);

            // Button'daki sayıyı güncelle
            updateButtonCount();

            // Console'da göster
            displayAssignedIssues(assignedData);

            console.log('✅ Veriler başarıyla yenilendi!');
        } else {
            console.error('❌ Veri çekilirken hata oluştu');
            showErrorState();
            return;
        }

    } catch (error) {
        console.error('❌ Veri yenileme hatası:', error);
        showErrorState();
        return;
    }

    // Loading state'i kaldır ve content'i güncelle
    hideLoadingState();
    updateFloatingDropdownContent();
}

// Global olarak erişilebilir yap
window.refreshAssignedIssues = refreshAssignedIssues;

// Loading state göster
function showLoadingState() {
    const dropdownItems = document.getElementById('floating-dropdown-items');
    const button = document.getElementById('floating-work-btn');

    // Button'a loading class ekle
    button.classList.add('loading');

    // Dropdown'da loading göster
    dropdownItems.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <div class="loading-text">Yeni veriler getiriliyor...</div>
        </div>
    `;
}

// Loading state gizle
function hideLoadingState() {
    const button = document.getElementById('floating-work-btn');
    button.classList.remove('loading');
}

// Error state göster
function showErrorState() {
    const dropdownItems = document.getElementById('floating-dropdown-items');
    const button = document.getElementById('floating-work-btn');

    // Button'dan loading class'ı kaldır
    button.classList.remove('loading');

    // Error mesajı göster
    dropdownItems.innerHTML = `
        <div class="error-state">
            <div class="error-icon">❌</div>
            <div class="error-text">
                <strong>Veri yüklenemedi</strong><br>
                Lütfen internet bağlantınızı kontrol edin<br>
                ve tekrar deneyin.
            </div>
            <button class="retry-button" onclick="refreshAssignedIssues()">
                🔄 Tekrar Dene
            </button>
        </div>
    `;
}

// Button'daki issue sayısını güncelle
function updateButtonCount() {
    const button = document.getElementById('floating-work-btn');
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownFooter = document.querySelector('.dropdown-footer');

    if (assignedIssues) {
        const count = assignedIssues.length;

        // Button'daki count badge'i güncelle
        let buttonCountElement = button.querySelector('.issue-count');
        if (count > 0) {
            if (!buttonCountElement) {
                buttonCountElement = document.createElement('span');
                buttonCountElement.className = 'issue-count';
                button.appendChild(buttonCountElement);
            }
            buttonCountElement.textContent = count;
            buttonCountElement.style.display = 'inline-flex';
        } else {
            if (buttonCountElement) {
                buttonCountElement.style.display = 'none';
            }
        }

        // Header'daki count badge'i güncelle
        if (dropdownHeader) {
            let headerCountElement = dropdownHeader.querySelector('.issue-count');
            if (count > 0) {
                if (!headerCountElement) {
                    headerCountElement = document.createElement('span');
                    headerCountElement.className = 'issue-count';
                    dropdownHeader.appendChild(headerCountElement);
                }
                headerCountElement.textContent = count;
                headerCountElement.style.display = 'inline-flex';
            } else {
                if (headerCountElement) {
                    headerCountElement.style.display = 'none';
                }
            }
        }

        // Footer'ı güncelle
        if (dropdownFooter) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            dropdownFooter.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span>🔄 Son güncelleme: ${timeString}</span>
                    <button onclick="refreshAssignedIssues()" style="background: none; border: none; color: #0052cc; cursor: pointer; font-size: 12px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,82,204,0.1)'" onmouseout="this.style.background='none'">
                        Yenile
                    </button>
                </div>
            `;
        }
    }
}

// Dropdown footer'ını güncelle
function updateDropdownFooter() {
    const dropdownFooter = document.querySelector('.dropdown-footer');
    if (dropdownFooter) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        dropdownFooter.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>🔄 Son güncelleme: ${timeString}</span>
                <button onclick="refreshAssignedIssues()" style="background: none; border: none; color: #0052cc; cursor: pointer; font-size: 12px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,82,204,0.1)'" onmouseout="this.style.background='none'">
                    Yenile
                </button>
            </div>
        `;
    }
}

// Middle click support ekle
function addMiddleClickSupport() {
    // Dropdown item'lar için middle click desteği
    const dropdownContainer = document.getElementById('floating-dropdown-items');

    if (dropdownContainer) {
        dropdownContainer.addEventListener('mousedown', function(e) {
            const dropdownItem = e.target.closest('.dropdown-item');
            if (dropdownItem && e.button === 1) { // Middle mouse button
                e.preventDefault();
                const href = dropdownItem.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                }
            }
        });

        // Ctrl+click ve Cmd+click için de yeni tab desteği
        dropdownContainer.addEventListener('click', function(e) {
            const dropdownItem = e.target.closest('.dropdown-item');
            if (dropdownItem && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                const href = dropdownItem.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                }
            }
        });
    }
}

// Ana fonksiyon
async function main() {
    console.log('🚀 Jira Floating Your Work scripti başlatılıyor...');

    // Position bilgisini storage'dan al
    const { position } = await chrome.storage.sync.get('position');
    const currentPosition = position || 'left';

    // CSS stillerini ekle
    addStyles(currentPosition);

    // Assigned to Me verilerini getir
    console.log('📡 Assigned to Me verileri getiriliyor...');
    const assignedData = await fetchAssignedIssues();

    if (assignedData && assignedData.data && assignedData.data.issues) {
        // Global değişkene kaydet
        assignedIssues = assignedData.data.issues.edges.map(edge => edge.node);

        // Console'da göster
        displayAssignedIssues(assignedData);
    }

    // Floating button'ı oluştur
    createFloatingButton();

    console.log('✅ Floating Your Work butonu eklendi!');
    console.log(`💡 ${currentPosition === 'right' ? 'Sağ' : 'Sol'} alttaki butona tıklayarak issues listesini görebilirsiniz.`);
    console.log('🔄 Verileri yenilemek için scripti tekrar çalıştırın.');
}

// Popup'tan gelen mesajları dinle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updatePosition') {
        const newPosition = request.position;
        console.log(`📍 Position güncelleniyor: ${newPosition}`);

        // CSS stillerini yeni position ile güncelle
        addStyles(newPosition);

        // Mevcut floating button'ı kaldır ve yeniden oluştur
        const existingButton = document.getElementById('floating-your-work');
        if (existingButton) {
            existingButton.remove();
        }

        // Yeni position ile button'ı oluştur
        createFloatingButton();

        // Slide-in animasyonu ekle
        const newButton = document.getElementById('floating-your-work');
        if (newButton) {
            newButton.classList.add('slide-in');
            setTimeout(() => {
                newButton.classList.remove('slide-in');
            }, 500);
        }

        sendResponse({ success: true });
    }
});

// Scripti çalıştır
main();
  })();
