# Drina Lux: проверка интерфейса

final result: passed

Проверено 2026-09-21 во встроенном браузере Codex. Приемка относится к локальному демо и согласованной адаптации второго макета, не к точному воспроизведению сгенерированной страницы или публичному запуску.

## Источники и визуальные доказательства

- Источник: `../references/ChatGPT Image 21 сент. 2026 г., 22_59_14 (2).png`, 941 × 1672 px.
- Первый экран реализации: `qa/reference-width-hero.png`, 941 × 800 px, CSS viewport 941 × 800, devicePixelRatio 1, EN, меню и диалоги закрыты.
- Совместное сравнение одинаковой ширины: `qa/comparison-hero.jpg` (1906 × 832). Из исходника взята верхняя область 941 × 800 без растягивания. Более высокий hero реализации является адаптивным решением: 752 px на данном viewport против ~475 px в исходном длинном концепте.
- Обзор композиции: `qa/comparison-full.jpg`. Слева исходник целиком, справа подписанный монтаж отдельных настольных секций. Это не непрерывный full-page screenshot и не измерение полной высоты страницы. Стандартный full-page capture IAB дал артефакты масштабирования, поэтому заменен монтажом достоверных viewport-снимков.
- Настольные снимки: `qa/desktop-hero.png`, `qa/desktop-villa.png`, `qa/desktop-gallery.png`, `qa/desktop-experience.png`, `qa/desktop-floorplan.png`; viewport 1440 × 1000. Для обзорного монтажа уменьшены пропорционально до ширины 941 px.
- Планшет: `qa/tablet-1024.png`, viewport 1024 × 900.
- Телефон: `qa/mobile-390.png`, `qa/mobile-gallery.png`, `qa/mobile-lightbox.png`, `qa/mobile-contact.png`, viewport 390 × 844; `qa/mobile-320-sr.png`, viewport 320 × 760. Мобильного исходника нет: проверена адаптация, а не совпадение с отсутствующим макетом.

## Проверенные поверхности

- **Шрифты:** локальные Cormorant Garamond Variable normal/italic и Manrope Variable загружены; заголовки и спокойная типографика сохраняют язык референса. Сербские диакритические знаки отображаются. Размеры адаптируются; обрезанных заголовков на проверенных ширинах нет.
- **Сетка и ритм:** крупная фотография, editorial intro, фото рядом с описанием, галерея и темный финальный CTA. Дополнительный блок плана и подробности одной виллы увеличивают высоту страницы осознанно. Нет второй вымышленной карточки. Горизонтальное переполнение отсутствует на 320, 390, 1024, 1440 px.
- **Цвета:** молочный фон, темно-зеленые кнопки и спокойные разделители. Текст читается; focus outline виден. Это визуальная проверка, не формальная сертификация WCAG всех пикселей фотографии.
- **Изображения:** настоящие фото пользователя, оптимизированные WebP; в интерфейсе нет вымышленных зданий, растянутых картинок или placeholder. План скопирован без изменений. Адаптивный crop героя отличается от сгенерированного кадра осознанно.
- **Контент:** тексты SR/EN согласованы по смыслу. Нет демонстрационных отзывов, цен и рейтингов. Телефон, email, Instagram и карта совпадают с последними сообщениями пользователя. Предварительный статус планировки виден рядом с ней и в увеличенном просмотре.

## Исправления и повторная проверка

1. До визуальной приемки исправлены имена variable-шрифтов, предсказуемость сетки галереи и обработка клика по padding диалога. Проверка после интеграции прошла.
2. [P2, исправлено] На 390 px фильтры галереи занимали три табличных ряда. После просмотра мобильного экрана заменены на компактную строку с подчеркиванием выбранной категории. Доказательства после исправления: `qa/mobile-gallery.png`, `qa/desktop-gallery.png`, `qa/comparison-full.jpg`.
3. Добавлено настоящее italic-начертание вместо отсутствующего варианта при отключенном font-synthesis. Итоговый первый экран повторно просмотрен: `qa/reference-width-hero.png`, `qa/mobile-390.png`.
4. После сравнения исправлен возврат фокуса на кнопку меню по Escape. Проверено на мобильном размере отдельно.

Открытых P0/P1/P2 дефектов в проверенном сценарии нет. Допустимые отличия: реальная фотография вместо генерации, одна вилла вместо двух, увеличенная галерея и предварительный план, адаптивная высота hero и более читаемые размеры текста.

## Функциональные сценарии

- SR → EN, перевод меню, заголовков, галереи и диалогов; язык документа, title и description обновляются.
- Выбор языка сохраняется после перезагрузки; URL содержит `lang` и сохраняет текущий якорь.
- Мобильное меню раскрывается, переход к галерее закрывает меню; Escape возвращает фокус на кнопку меню.
- Фильтр Interiors оставляет только интерьер; смена фото стрелкой клавиатуры меняет подпись и счетчик.
- Show all photos: 6 → 12 карточек; Show fewer: 12 → 6.
- Escape закрывает native dialog. Shift+Tab в контактах циклически переводит фокус на последний элемент; закрытие возвращает его инициатору.
- План увеличивается, имеет видимую кнопку закрытия и предупреждение о предварительном статусе.
- Контактный диалог показывает корректные `tel:`, `mailto:`, Instagram и Booking. Переходы наружу не отправляют сообщение и не создают бронь. Звонки и письма не выполнялись.
- Maps и Booking имеют правильные внешние URL. Полный сценарий бронирования на сторонней площадке не тестировался; прямое чтение Booking ограничено anti-bot.
- При эмуляции prefers-reduced-motion: reduce браузер подтвердил `scroll-behavior: auto`. Эмуляция затем сброшена.
- В консоли браузера нет warning/error на пройденных сценариях. У загруженных изображений нет ошибок.

## Технические проверки

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed (стандартные проверки сохраненного runtime, не проверка публичного размещения).
- Оригинальные изображения не изменены; копия планировки проверена по SHA-256.

## Следующий этап

Редактура сербского носителем языка и подтверждение планировки владельцем перед публикацией. Публичный домен, индексация и аналитика не настроены; установлен noindex.

## Уточнение визуального стиля, 2026-09-22

- Выбран паттерн Blur Fade (Dillion Verma / Magic UI на 21st.dev); поведение адаптировано на нативных Web Animations API и IntersectionObserver без новых зависимостей.
- В браузере наблюдались анимации появления 700 мс и начальное движение hero 1400 мс. При reduced motion: 0 активных анимаций, 0 скрытых блоков, hero animation-name: none.
- Переключение SR → EN работает; площадь гостиной отображается как 21 м².
- Обновленный план 1179×966 виден в диалоге; копия совпадает с исходником по SHA-256.
- Ширины 390 и 320 px: scrollWidth равен innerWidth. В консоли нет warning/error.
- Финальные typecheck и production build прошли. Временные настройки viewport и reduced motion сброшены.
- Локальные снимки: qa/refinement-mobile.png, qa/refinement-floor-plan.png (не включены в Git).

## Мобильное curved menu, 2026-09-22

- Адаптирован предоставленный пользователем curved-menu: выезд справа, выпрямляющийся край, последовательное появление ссылок. CSS и существующий native Modal, без новых зависимостей.
- В браузере проверены: 390×844 визуально; 320×568 без горизонтального скролла; Shift+Tab с кнопки закрытия на последний элемент; Escape и возврат фокуса; переход к #gallery с фокусом на секции; закрытие при переходе на desktop и снятие scroll lock.
- Reduced motion: animation-name none, закрытие немедленное. Консоль без warning/error. Typecheck и build прошли.

## Compact glass header

Browser verified: transparent at scroll top with 106 px height; after navigation, fixed top=0 and 53 px height, backdrop blur 20 px. Mobile: 48 px header, 44 px menu button, no horizontal overflow at 390 px, menu opens and Escape closes it. Typecheck and build passed.

## Idila and reciprocal navigation, 2026-09-22

- Added `/idila/` and reciprocal property links in both desktop headers and mobile menus. English persists across actual navigation in both directions. Direct route load/reload verified.
- Idila reviewed at 1440, 1024, 390 and 320 CSS px; no document horizontal overflow. Drina header also checked at 820 px with no overlap or overflow.
- Idila mobile menu property links tested in both directions. Tablet menu available at 1024 px. Section link to Tara closes dialog, unlocks body scroll and reaches target.
- Gallery opened, next photo advanced counter, Escape closed dialog and restored initiating button focus. Bedroom image loaded at original 700 px width. Real source images load; no browser warnings/errors in checked final scenarios.
- `npm run typecheck`, `npm run build`, `npm run test:sites` passed (4 tests). `git diff --check` passed.
- Video, phone, email and map destinations inspected; no message or call sent. External video playback and published hosting not verified. Local preview only.

## Idila refinement and motion parity, 2026-09-22

final result: passed

### Visual target and evidence

Target: `../references/idila-tara/concept-v1.png` (941 x 1672), with the user's later instructions to harmonize sections, remove Tara.rs logos and transfer Drina effects. Reference and final `qa/idila-refinement-reference-width.png` (941 x 850 CSS/PNG, 1x) were opened together in a single comparison input. This is a focused top-region comparison; the source is a full-page mock. At this width the existing responsive menu intentionally collapses, unlike the static mock. Additional rendered evidence: `qa/idila-refinement-desktop.png` and `qa/idila-refinement-story.png` (1440 x 1000), `qa/idila-refinement-mobile.png` (390 x 844). The latter shows layout before the final cleaned-image substitution. Final clean JPEG imagery was also inspected in the browser.

### Findings and corrections

- P2 fixed: hero paragraph margin lost to `.idila-page p`. More specific rule restores separation from the divider. Final 941 px comparison shows the gap.
- P2 fixed: fixed-height location image left an empty 185 px region below it. Image now stretches to the content height; browser measured both sides at 616.3 px after correction and the revised screenshot was visually inspected.
- P2 fixed per user: inconsistent section extents and oversized crops. Shared 1440 px maximum and common gutters/section rhythm applied; story images now balanced.
- P2 fixed per user: static header/no motion parity. Browser measured header 106 px at top, 53 px on desktop scroll; 85/48 px on mobile. Compact backdrop blur 20 px, fixed top=0.
- P2 fixed per user: logos visible in source photos. Five image_gen edited copies were visually inspected; page uses optimized clean JPEG derivatives. Original files retained.

### Required surfaces

- Typography: existing Cormorant/Manrope retained; headline wraps and functional text readable. Location headline reduced to balance adjacent photo.
- Rhythm: consistent widths, balanced story columns and equal-height location columns; no horizontal document overflow at checked 320, 390, 941 and 1440 px.
- Tokens: cream/rust identity retained; compact dark glass uses light text and visible controls.
- Images: source-derived scenes and edited results inspected; watermark absent, no stretching. Small generative texture/detail differences remain a documented limitation in `idila-image-edits.md`, not pixel-exact source preservation.
- Content: SR/EN behavior and factual property copy retained; no new claims, prices or availability added.

### Behavior and technical checks

- Mobile menu animates in/out with curved edge and staggered links; Tara link closes it, unlocks scroll and focuses #tara. Escape works.
- Shared once-only useLuxuryMotion hook, hero settle and restrained hover transitions added.
- Emulated reduced motion: menu/hero animation-name none, header transition 0s; override removed afterward.
- Final narrow-screen menu/EN and clean hero load verified; browser warning/error log empty.
- Typecheck and production build passed; git diff --check passed. No external messages, calls or deployment performed.
