document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const body = document.body;
    const enterSiteBtn = document.getElementById('enter-site');
    const cursorGlow = document.getElementById('cursorGlow');
    const readingProgressBar = document.getElementById('readingProgress');

    // Navigation Drawer
    const menuToggle = document.getElementById('menu-toggle');
    const closeNavBtn = document.getElementById('closeNavBtn');
    const chapterNav = document.getElementById('chapter-nav');

    // Edit Modal Drawer
    const editToggle = document.getElementById('edit-toggle');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalBackdrop = document.getElementById('closeModalBackdrop');
    const editModal = document.getElementById('editModal');

    // Form Fields
    const loreForm = document.getElementById('loreForm');
    const charName = document.getElementById('charName');
    const charKanji = document.getElementById('charKanji');
    const charAge = document.getElementById('charAge');
    const charGender = document.getElementById('charGender');
    const charPhysique = document.getElementById('charPhysique');
    const charOrigin = document.getElementById('charOrigin');
    const charClan = document.getElementById('charClan');
    const charJob = document.getElementById('charJob');
    const charFaction = document.getElementById('charFaction');
    const charRank = document.getElementById('charRank');
    const charWeapon = document.getElementById('charWeapon');
    const charQuote = document.getElementById('charQuote');
    const abilityName = document.getElementById('abilityName');
    const abilityLabel = document.getElementById('abilityLabel');
    const charPersonality = document.getElementById('charPersonality');
    const charAppearance = document.getElementById('charAppearance');
    const charLore = document.getElementById('charLore');

    // Stats Sliders & Displays
    const statForce = document.getElementById('statForce');
    const statVitesse = document.getElementById('statVitesse');
    const statEndurance = document.getElementById('statEndurance');
    const statMaitrise = document.getElementById('statMaitrise');

    const valForce = document.getElementById('val-force');
    const valVitesse = document.getElementById('val-vitesse');
    const valEndurance = document.getElementById('val-endurance');
    const valMaitrise = document.getElementById('val-maitrise');

    const valForceDisplay = document.getElementById('valForceDisplay');
    const valVitesseDisplay = document.getElementById('valVitesseDisplay');
    const valEnduranceDisplay = document.getElementById('valEnduranceDisplay');
    const valMaitriseDisplay = document.getElementById('valMaitriseDisplay');

    const barForce = document.getElementById('barForce');
    const barVitesse = document.getElementById('barVitesse');
    const barEndurance = document.getElementById('barEndurance');
    const barMaitrise = document.getElementById('barMaitrise');

    // Live Displays
    const entryCharName = document.getElementById('entryCharName');
    const topbarCharName = document.getElementById('topbarCharName');
    const topbarRank = document.getElementById('topbarRank');

    const prevKanji = document.getElementById('prevKanji');
    const prevHeroName = document.getElementById('prevHeroName');
    const prevQuote = document.getElementById('prevQuote');
    const prevKanjiMeta = document.getElementById('prevKanjiMeta');
    const prevFactionMeta = document.getElementById('prevFactionMeta');
    const prevRankMeta = document.getElementById('prevRankMeta');

    const prevCardName = document.getElementById('prevCardName');
    const prevCardKanji = document.getElementById('prevCardKanji');
    const prevCardAge = document.getElementById('prevCardAge');
    const prevCardPhysique = document.getElementById('prevCardPhysique');
    const prevCardOrigin = document.getElementById('prevCardOrigin');
    const prevCardClan = document.getElementById('prevCardClan');
    const prevCardFaction = document.getElementById('prevCardFaction');
    const prevCardRank = document.getElementById('prevCardRank');
    const prevCardJob = document.getElementById('prevCardJob');
    const prevCardWeapon = document.getElementById('prevCardWeapon');

    const prevAbilityTitle = document.getElementById('prevAbilityTitle');
    const prevTechList = document.getElementById('prevTechList');
    const addTechBtn = document.getElementById('addTechBtn');
    const techniquesList = document.getElementById('techniquesList');
    const copyDiscordBtn = document.getElementById('copyDiscordBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveStatus = document.getElementById('saveStatus');

    const prevHabit1 = document.getElementById('prevHabit1');
    const prevHabit2 = document.getElementById('prevHabit2');
    const prevLoreBody = document.getElementById('prevLoreBody');
    const prevLoreQuote = document.getElementById('prevLoreQuote');

    let techCount = 0;

    // --- UNLOCK ENTRANCE WITH PASSWORD (kuroha) ---
    const passForm = document.getElementById('passForm');
    const passInput = document.getElementById('passInput');
    const passError = document.getElementById('passError');

    function checkPassword(e) {
        if (e) e.preventDefault();
        const entered = (passInput ? passInput.value : '').trim().toLowerCase();
        
        if (entered === 'kuroha') {
            if (passError) passError.style.opacity = '0';
            body.classList.remove('is-locked');
            body.classList.add('is-unlocked');
        } else {
            if (passError) {
                passError.textContent = 'Accès refusé | Mot de passe incorrect';
                passError.style.opacity = '1';
            }
            if (passInput) {
                passInput.style.borderColor = '#ff5555';
                passInput.value = '';
                passInput.focus();
                setTimeout(() => { passInput.style.borderColor = 'rgba(11,197,234,0.3)'; }, 1500);
            }
        }
    }

    if (passForm) {
        passForm.addEventListener('submit', checkPassword);
    } else if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', checkPassword);
    }

    // --- CURSOR GLOW EFFECT ---
    window.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // --- SCROLL READING PROGRESS ---
    window.addEventListener('scroll', () => {
        if (readingProgressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                readingProgressBar.style.width = `${progress}%`;
            }
        }
    });

    // --- DRAWER TOGGLES ---
    if(menuToggle) menuToggle.addEventListener('click', () => {
        chapterNav.classList.toggle('is-open');
    });

    if (closeNavBtn) {
        if(closeNavBtn) closeNavBtn.addEventListener('click', () => {
            chapterNav.classList.remove('is-open');
        });
    }


    // Close Sommaire menu when clicking outside
    document.addEventListener('click', (e) => {
        if (chapterNav && chapterNav.classList.contains('is-open')) {
            if (!chapterNav.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
                chapterNav.classList.remove('is-open');
            }
        }
    });

    chapterNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            chapterNav.classList.remove('is-open');
        });
    });

    if(editToggle) editToggle.addEventListener('click', () => {
        editModal.classList.add('is-active');
    });

    function closeEditModal() {
        editModal.classList.remove('is-active');
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', closeEditModal);
    if(closeModalBackdrop) closeModalBackdrop.addEventListener('click', closeEditModal);

    // --- FACTION CONFIGURATIONS ---
    const factionData = {
        'Pourfendeur': {
            label: 'Nom du Souffle',
            placeholder: 'Ex: Souffle de la Brume',
            accentColor: '#0bc5ea'
        },
        'Démon': {
            label: 'Pouvoir Sanguinaire (Blood Demon Art)',
            placeholder: 'Ex: Art Sanguinaire de l\'Illusion',
            accentColor: '#ff2a5f'
        },
        'Civil': {
            label: 'Style de Combat / Aptitude Spéciale',
            placeholder: 'Ex: Autodidacte / Style de la Rue',
            accentColor: '#c8aa6e'
        },
        'Autre': {
            label: 'Style de Combat',
            placeholder: 'Ex: Inconnu / Magie',
            accentColor: '#a0aec0'
        }
    };

    // --- INITIALIZE & LOCAL STORAGE ---
    function init() {
        const savedData = localStorage.getItem('demonslayer_rp_lore_kuroiwa');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (charName) charName.value = data.name || '';
                if (charKanji) charKanji.value = data.kanji || '';
                if (charAge) charAge.value = data.age || '';
                if (charGender) charGender.value = data.gender || 'Femme';
                if (charPhysique) charPhysique.value = data.physique || '1m61 / 40 kg';
                if (charOrigin) charOrigin.value = data.origin || 'Orphenina';
                if (charClan) charClan.value = data.clan || 'Clan Iesada';
                if (charJob) charJob.value = data.job || 'Aucune (Enfant)';

                if (charFaction) charFaction.value = data.faction || 'Pourfendeur';
                if (charRank) charRank.value = data.rank || '';
                if (charWeapon) charWeapon.value = data.weapon || '';
                if (charQuote) charQuote.value = data.quote || '';
                if (abilityName) abilityName.value = data.ability || '';
                if (charPersonality) charPersonality.value = data.personality || '';
                if (charAppearance) charAppearance.value = data.appearance || '';
                if (charLore) charLore.value = data.lore || '';

                statForce.value = data.stats?.force || 5;
                statVitesse.value = data.stats?.vitesse || 5;
                statEndurance.value = data.stats?.endurance || 5;
                statMaitrise.value = data.stats?.maitrise || 5;

                if (data.techniques && data.techniques.length > 0) {
                    techniquesList.innerHTML = '';
                    data.techniques.forEach(t => addTechniqueRow(t.name, t.desc));
                } else {
                    addTechniqueRow('1ère Forme: Ciel Suspendu', 'Une estocade directe enveloppée d\'une traînée de brume condensée.');
                }
            } catch (e) {
                console.error("Error loading saved data", e);
                setDefaultDemo();
            }
        } else {
            setDefaultDemo();
        }

        updateFactionUI();
        updateLiveView();
    }

    function setDefaultDemo() {
        if (charName) charName.value = 'Kuroha Iesada';
        if (charKanji) charKanji.value = '黒羽 家定';
        if (charAge) charAge.value = '18 ans';
        if (charGender) charGender.value = 'Femme';
        if (charPhysique) charPhysique.value = '1m61 / 40 kg';
        if (charOrigin) charOrigin.value = 'Orphenina';
        if (charClan) charClan.value = 'Clan Iesada (Anciens ninjas)';
        if (charJob) charJob.value = 'Soldat conditionnée (Enfant)';

        if (charFaction) charFaction.value = 'Pourfendeur';
        if (charRank) charRank.value = 'Gardienne de l\'Ouroboros (Ⅰ: La Malice)';
        if (charWeapon) charWeapon.value = 'Sabre Nichirin du Soleil Noir';
        if (charQuote) charQuote.value = '« Écartée des Quatre Ombres qui franchirent l\'épreuve ensemble, ma survie en solitaire complet m\'a élevée au rang de Gardienne de la Malice. »';
        if (abilityName) abilityName.value = 'Souffle de la Brume';
        if (charPersonality) charPersonality.value = 'Conditionnée comme un soldat depuis son enfance au sein du clan d\'anciens ninjas Iesada, Kuroha ne laisse jamais ses émotions influencer ses décisions. Elle juge les individus sur leurs actes et leur efficacité, non sur leurs intentions. Sa loyauté appartient d\'abord à son père Kurikara Iesada (Pilier du Serpent).';
        if (charAppearance) charAppearance.value = 'Cheveux blancs immaculés, yeux rouges intenses au regard froid. 1m61 pour 40 kg, sans aucune cicatrice. Porte son uniforme avec un serpent vivant apprivoisé enroulé autour de son cou et s\'exprime d\'une voix charmeuse.';
        if (charLore) charLore.value = 'Avant de porter le nom d\'Iesada, Kuroha n\'était qu\'une Pourfendeuse parmi tant d\'autres. Elle ne possédait aucune origine prestigieuse, aucune place déjà définie dans une grande lignée, ni aucun héritage qui aurait pu lui offrir une quelconque reconnaissance. Sa valeur ne fut jamais déterminée par son nom, mais uniquement par ce qu\'elle était capable de démontrer à travers ses actes.\n\nDès ses premiers pas au sein de l\'Ordre des Pourfendeurs, sa progression se distingua rapidement des autres recrues. Son apprentissage était rapide, sa capacité d\'adaptation impressionnante et son comportement singulier. Elle ne cherchait ni à impressionner, ni à quémander une reconnaissance: elle exécutait, observait et analysait. Chaque échec devenait une donnée à corriger, chaque erreur une faiblesse à éliminer, et chaque affrontement une possibilité d\'apprentissage.\n\n« La puissance sans contrôle n\'est qu\'une faiblesse. Le talent sans discipline n\'est qu\'un potentiel gâché. L\'émotion sans maîtrise est une faille. »\n\nCette mentalité analytique attira l\'attention du clan Iesada. Porter ce nom exigeait bien plus qu\'une simple appartenance: il représentait une philosophie, une discipline de fer et l\'exigence absolue de contrôler chaque aspect de son existence. Pour eux, la véritable force ne résidait pas dans l\'absence d\'émotion, mais dans la capacité à rester maître de soi même malgré celles ci. Après de nombreuses observations en mission, Kuroha fut officiellement reconnue et adoptée comme une Iesada alors qu\'elle portait le rang de Kanoe.\n\nLa reconnaissance du clan Iesada ne marqua pas la fin de son parcours, mais le début d\'une nouvelle étape: le Projet du Prodige Iesada. L\'objectif était d\'exceller dans chaque domaine nécessaire à un maître de guerre (le corps, l\'esprit, l\'analyse, la discipline et la volonté). Son entraînement fut poussé dans les moindres détails: la réaction du corps sous la fatigue, la prise de décision en quelques secondes, la gestion de la peur, la résistance à la douleur et la concentration sous la pression. Chaque épreuve visait à transformer une faiblesse en force.\n\nC\'est durant cette période que son entraînement mental atteignit un niveau d\'exception. Pour le clan Iesada, la mémoire était une arme au même titre qu\'une lame. Kuroha apprit à retenir les mouvements, visages, paroles, stratégies et environnements entiers avec une précision chirurgicale. Son cerveau devint un outil d\'analyse constant. Elle n\'était pas née comme un prodige: elle était en train d\'en devenir un.\n\nLe véritable objectif du clan résidait plus loin: la maîtrise complète de la Marque des Iesada. Éveiller une marque n\'était pas la difficulté principale; la véritable épreuve était de survivre à ce qu\'elle imposait au corps (la chaleur, la pression, les changements internes et la destruction des limites physiques). Kuroha devait devenir assez parfaite pour que son corps et son esprit puissent supporter cette puissance sans jamais perdre le contrôle.\n\nParallèlement, destinée initialement aux rangs des Quatre Ombres, Kuroha fut d\'abord qualifiée d\'échec et écartée. Là où les Quatre Ombres franchirent leur sélection ensemble en groupe, Kuroha fut l\'unique exception contrainte d\'affronter la sélection de survie ultime en solitaire complet. En triomphant seule de cette épreuve, elle s\'éleva au titre suprême de Gardienne de l\'Ouroboros (Ⅰ: La Malice).';
        addTechniqueRow('1ère Forme: Ciel Suspendu', 'Une estocade directe enveloppée d\'une traînée de brume condensée.');
        addTechniqueRow('4ème Forme: Flux de Brume', 'Un enchaînement rapide de coups de sabre horizontaux pour dissimuler sa présence tout en avançant.');
    }

    function addTechniqueRow(name = '', desc = '') {
        techCount++;
        const div = document.createElement('div');
        div.className = 'tech input row';
        div.innerHTML = `
      <input type="text" class="tech-name-input" placeholder="Nom de la forme" value="${name}">
      <textarea class="tech-desc-input" placeholder="Description de l'effet..." rows="2">${desc}</textarea>
      <button type="button" class="btn-remove-tech" title="Supprimer">
        <ion-icon name="close-circle-outline"></ion-icon>
      </button>
    `;

        const removeBtn = div.querySelector('.btn-remove-tech');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
            div.remove();
            autoSave();
            updateLiveView();
            });
        }

        div.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                autoSave();
                updateLiveView();
            });
        });

        techniquesList.appendChild(div);
    }

    function updateFactionUI() {
        const faction = charFaction.value;
        const config = factionData[faction] || factionData['Autre'];
        abilityLabel.textContent = config.label;
        abilityName.placeholder = config.placeholder;
        document.documentElement.style.setProperty('--acc teal', config.accentColor);
        document.documentElement.style.setProperty('--acc teal glow', `${config.accentColor}4d`);
    }

    function autoSave() {
        const techs = [];
        document.querySelectorAll('.tech input row').forEach(row => {
            const name = row.querySelector('.tech name input').value.trim();
            const desc = row.querySelector('.tech desc input').value.trim();
            if (name || desc) {
                techs.push({ name, desc });
            }
        });

        const data = {
            name: charName.value,
            kanji: charKanji.value,
            age: charAge.value,
            gender: charGender ? charGender.value: 'Femme',
            physique: charPhysique ? charPhysique.value: '1m61 / 40 kg',
            origin: charOrigin ? charOrigin.value: 'Orphenina',
            clan: charClan ? charClan.value: 'Clan Iesada',
            job: charJob ? charJob.value: 'Aucune (Enfant)',
            faction: charFaction.value,
            rank: charRank.value,
            weapon: charWeapon.value,
            quote: charQuote.value,
            ability: abilityName.value,
            personality: charPersonality.value,
            appearance: charAppearance.value,
            lore: charLore.value,
            stats: {
                force: statForce.value,
                vitesse: statVitesse.value,
                endurance: statEndurance.value,
                maitrise: statMaitrise.value
            },
            techniques: techs
        };

        localStorage.setItem('demonslayer_rp_lore_kuroiwa', JSON.stringify(data));

        saveStatus.textContent = "Sauvegardé en direct";
        saveStatus.classList.add('saved');
        setTimeout(() => {
            saveStatus.classList.remove('saved');
        }, 1200);
    }

    function updateLiveView() {
        const nameVal = charName.value.trim() || 'Kuroha Iesada';
        const kanjiVal = charKanji.value.trim() || '黒羽 家定';
        const ageVal = charAge.value.trim() || '18 ans';
        const genderVal = charGender ? charGender.value.trim(): 'Femme';
        const physiqueVal = charPhysique ? charPhysique.value.trim(): '1m61 / 40 kg';
        const originVal = charOrigin ? charOrigin.value.trim(): 'Orphenina';
        const clanVal = charClan ? charClan.value.trim(): 'Clan Iesada';
        const jobVal = charJob ? charJob.value.trim(): 'Aucune (Enfant)';
        const factionVal = charFaction.value || 'Pourfendeur';
        const rankVal = charRank.value.trim() || 'Mizunoto';
        const weaponVal = charWeapon.value.trim() || 'Sabre Nichirin';
        const quoteVal = charQuote.value.trim() || '« Une volonté incapable de s’opposer à la violence ne protège personne. »';

        // Hero & Header
        entryCharName.textContent = `de ${nameVal}`;
        topbarCharName.textContent = nameVal;
        topbarRank.textContent = `Statut: ${rankVal}`;
        prevKanji.textContent = kanjiVal.charAt(0) || '黒';

        const nameParts = nameVal.split(' ');
        if (nameParts.length > 1) {
            prevHeroName.innerHTML = `${nameParts[0]}<br><span>${nameParts.slice(1).join(' ')}</span>`;
        } else {
            prevHeroName.innerHTML = nameVal;
        }

        prevQuote.textContent = quoteVal;
        prevKanjiMeta.textContent = kanjiVal;
        prevFactionMeta.textContent = `Clan: ${clanVal}`;
        prevRankMeta.textContent = rankVal;

        // Fiche Card
        prevCardName.textContent = nameVal;
        prevCardKanji.textContent = kanjiVal;
        prevCardAge.textContent = `${ageVal} (${genderVal})`;
        if (prevCardPhysique) prevCardPhysique.textContent = physiqueVal;
        if (prevCardOrigin) prevCardOrigin.textContent = originVal;
        if (prevCardClan) prevCardClan.textContent = clanVal;
        prevCardFaction.textContent = factionVal;
        prevCardRank.textContent = rankVal;
        if (prevCardJob) prevCardJob.textContent = jobVal;
        prevCardWeapon.textContent = weaponVal;

        // Combat & Abilities
        prevAbilityTitle.textContent = abilityName.value.trim() || 'Style de Combat';
        prevTechList.innerHTML = '';
        let hasTechs = false;

        document.querySelectorAll('.tech input row').forEach(row => {
            const tName = row.querySelector('.tech name input').value.trim();
            const tDesc = row.querySelector('.tech desc input').value.trim();
            if (tName || tDesc) {
                hasTechs = true;
                const div = document.createElement('div');
                div.className = 'prev tech item';
                div.innerHTML = `<h6>${tName || 'Forme sans nom'}</h6><p>${tDesc || 'Pas de description.'}</p>`;
                prevTechList.appendChild(div);
            }
        });

        if (!hasTechs) {
            prevTechList.innerHTML = '<p class="no data">Aucune forme enregistrée.</p>';
        }

        // Stats
        valForce.textContent = statForce.value;
        valVitesse.textContent = statVitesse.value;
        valEndurance.textContent = statEndurance.value;
        valMaitrise.textContent = statMaitrise.value;

        valForceDisplay.textContent = `${statForce.value}/10`;
        valVitesseDisplay.textContent = `${statVitesse.value}/10`;
        valEnduranceDisplay.textContent = `${statEndurance.value}/10`;
        valMaitriseDisplay.textContent = `${statMaitrise.value}/10`;

        barForce.style.width = `${statForce.value * 10}%`;
        barVitesse.style.width = `${statVitesse.value * 10}%`;
        barEndurance.style.width = `${statEndurance.value * 10}%`;
        barMaitrise.style.width = `${statMaitrise.value * 10}%`;

        // Personality & Narrative
        prevHabit1.textContent = charPersonality.value.trim() || 'À renseigner...';
        prevHabit2.textContent = charAppearance.value.trim() || 'À renseigner...';

        const loreText = charLore.value.trim();
        if (loreText) {
            const paragraphs = loreText.split('\n').filter(p => p.trim());
            if (paragraphs.length > 0) {
                prevLoreBody.textContent = paragraphs[0];
                prevLoreQuote.textContent = quoteVal;

                document.querySelectorAll('.dynamic lore p').forEach(p => p.remove());

                for (let i = 1; i < paragraphs.length; i++) {
                    const p = document.createElement('p');
                    p.className = 'dynamic lore p';
                    p.textContent = paragraphs[i];
                    prevLoreContainer.appendChild(p);
                }
            }
        }
    }

    // --- DISCORD MARKDOWN EXPORT ---
    function copyToDiscord() {
        const name = charName.value.trim() || 'Non renseigné';
        const kanji = charKanji.value.trim() || '';
        const age = charAge.value.trim() || 'Non renseigné';
        const faction = charFaction.value || 'Non renseigné';
        const rank = charRank.value.trim() || 'Non renseigné';
        const weapon = charWeapon.value.trim() || 'Non renseigné';
        const quote = charQuote.value.trim() || '';
        const ability = abilityName.value.trim() || 'Non renseigné';
        const personality = charPersonality.value.trim() || 'Non renseigné';
        const appearance = charAppearance.value.trim() || 'Non renseigné';
        const lore = charLore.value.trim() || 'Non renseigné';

        const getBar = (val) => {
            const filled = '█'.repeat(val);
            const empty = '░'.repeat(10 - val);
            return `[${filled}${empty}] (${val}/10)`;
        };

        let message = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**🏮 ARCHIVES DE PERSONNAGE - DEMON SLAYER 🏮**
*${quote}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📁 IDENTITÉ & ETAT CIVIL**
> 👤 **Nom complet:** ${name} ${kanji ? `(${kanji})`: ''}
> ⏳ **Âge:** ${age}
> ⚔️ **Faction / Alignement:** ${faction}
> 🎖️ **Grade / Rang RP:** ${rank}
> 🗡️ **Arme & Équipement:** ${weapon}

**⚡ APTITUDES & STYLE DE COMBAT**
> 🌀 **Capacité / Souffle:** ${ability}

`;

        let count = 0;
        document.querySelectorAll('.tech input row').forEach(row => {
            const tName = row.querySelector('.tech name input').value.trim();
            const tDesc = row.querySelector('.tech desc input').value.trim();
            if (tName || tDesc) {
                count++;
                message += `🔹 **${tName || `Forme #${count}`}**\n> *${tDesc || 'Pas de description.'}*\n\n`;
            }
        });

        message += `**📊 STATISTIQUES DE COMBAT**
> 💪 **Force Physique:** ${getBar(parseInt(statForce.value))}
> ⚡ **Vitesse & Agilité:** ${getBar(parseInt(statVitesse.value))}
> 🛡️ **Endurance & Vitalité:** ${getBar(parseInt(statEndurance.value))}
> 🎹 **Maîtrise de l'Arme / Souffle:** ${getBar(parseInt(statMaitrise.value))}

**🧠 PSYCHOLOGIE & TEMPÉRAMENT**
\`\`\`
${personality}
\`\`\`

**👁️ APPARENCE & PHYSIQUE**
\`\`\`
${appearance}
\`\`\`

**📖 HISTOIRE & ORIGINES**
\`\`\`
${lore}
\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Généré depuis les Archives Confidentielles du Bureau de Renseignement.*`;

        navigator.clipboard.writeText(message).then(() => {
            const originalText = copyDiscordBtn.innerHTML;
            copyDiscordBtn.innerHTML = '<ion icon name="checkmark outline"></ion icon> Copié !';
            copyDiscordBtn.style.background = '#48bb78';
            setTimeout(() => {
                copyDiscordBtn.innerHTML = originalText;
                copyDiscordBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie', err);
            alert("Erreur de copie dans le presse papiers.");
        });
    }

    // --- LISTENERS ---
    if(charFaction) charFaction.addEventListener('change', () => {
        updateFactionUI();
        autoSave();
        updateLiveView();
    });

    if(addTechBtn) addTechBtn.addEventListener('click', () => {
        addTechniqueRow();
        autoSave();
    });

    if(copyDiscordBtn) copyDiscordBtn.addEventListener('click', copyToDiscord);

    if(clearBtn) clearBtn.addEventListener('click', () => {
        if (confirm("Réinitialiser entièrement la fiche ? (Toutes les données saisies seront effacées)")) {
            localStorage.removeItem('demonslayer_rp_lore_kuroiwa');
            loreForm.reset();
            techniquesList.innerHTML = '';
            setDefaultDemo();
            updateFactionUI();
            updateLiveView();
            autoSave();
        }
    });

    if(loreForm) loreForm.addEventListener('input', () => {
        autoSave();
        updateLiveView();
    });

    // Run AOS
    if (window.AOS) {
        AOS.init({ duration: 1200, once: true, easing: 'ease out cubic', offset: 100 });
    }

    // Run Init
    init();
});
