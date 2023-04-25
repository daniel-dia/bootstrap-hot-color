const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

function toRgb(color) {
    return tinycolor(color).toRgbString().match(/\d+/g).map(Number).join(', ');
}

function shadeColor(color, weight) {
    return tinycolor.mix(color, 'black', weight).toHexString();
}

function tintColor(color, weight) {
    return tinycolor.mix(color, 'white', weight).toHexString();
}

function shiftColor(color, weight) {
    return weight > 0 ? shadeColor(color, weight) : tintColor(color, -weight);
}

function luminance(color) {
    return tinycolor(color).getLuminance()
}

function getContrastRatio(background, foreground) {/*= colorContrastLight*/
    return tinycolor.readability(background, foreground);
}

function mix(color1, color2, amount = 50) {
    return tinycolor.mix(color1, color2, amount).toHexString();
}

function colorContrast(background) {
    const foregrounds = ['white', 'black'];
    const minContrastRatio = 2;
    let maxRatio = 0;
    let maxRatioColor = null;

    for (let i = 0; i < foregrounds.length; i++) {
        const color = foregrounds[i];
        const contrastRatio = getContrastRatio(background, color);
        if (contrastRatio > minContrastRatio) {
            return color;
        } else if (contrastRatio > maxRatio) {
            maxRatio = contrastRatio;
            maxRatioColor = color;
        }
    }

    return maxRatioColor;
}

function primaryColor(primary) {

    const color = colorContrast(primary);

    const table_primary = shiftColor(primary, -80);
    const table_color = colorContrast('white', table_primary);
    const table_hoverBg = mix(table_color, table_primary, 75); // table-hover-bg-factor
    const table_stripedBg = mix(table_color, table_primary, 5); // tableStripedBgFactor
    const table_activeBg = mix(table_color, table_primary, 10); // tableActiveBgFactor
    const table_tableBorderColor = mix(table_color, table_primary, 10); // tableBorderFactor

    styleElement.innerHTML = `
   
    :root { 
        --bs-primary: ${primary};
        --bs-primary-rgb: ${toRgb(primary)};	
        --bs-link-color-rgb: ${toRgb(primary)};
        --bs-primary-text-emphasis: ${shadeColor(primary, 60)};
        --bs-primary-bg-subtle: ${tintColor(primary, 80)};
        --bs-primary-border-subtle: ${tintColor(primary, 60)};
        --bs-link-color: ${primary};
    }    

    .table-primary {
        --bs-table-color: ${colorContrast(table_primary)};
        --bs-table-bg: ${table_primary};
        --bs-table-border-color: ${table_tableBorderColor};
        --bs-table-striped-bg: ${table_stripedBg};
        --bs-table-striped-color: ${colorContrast(table_stripedBg)};
        --bs-table-active-bg: ${table_activeBg};
        --bs-table-active-color: ${colorContrast(table_activeBg)};
        --bs-table-hover-bg: ${table_hoverBg};
        --bs-table-hover-color: ${colorContrast(table_hoverBg)};
        color: var(--bs-table-color); /*IGNORE*/
        border-color: var(--bs-table-border-color); /*IGNORE*/
    }

    .btn-primary {
        --bs-btn-color: ${color};
        --bs-btn-bg: ${primary};
        --bs-btn-border-color: ${primary};
        --bs-btn-hover-color: ${color};
        --bs-btn-hover-bg: ${shadeColor(primary, 15)};
        --bs-btn-hover-border-color: ${shadeColor(primary, 20)};
        --bs-btn-focus-shadow-rgb: ${toRgb(mix(primary, primary, 15))} ;
        --bs-btn-active-color: ${color};
        --bs-btn-active-bg: ${shadeColor(primary, 20)};
        --bs-btn-active-border-color: ${shadeColor(primary, 25)};
        --bs-btn-disabled-color: ${color};
        --bs-btn-disabled-bg: ${primary};
        --bs-btn-disabled-border-color: ${primary};
    }

    .btn-outline-primary {
        --bs-btn-color: ${primary};
        --bs-btn-border-color: ${primary};
        --bs-btn-hover-color: ${color};
        --bs-btn-hover-bg: ${primary};
        --bs-btn-hover-border-color: ${primary};
        --bs-btn-focus-shadow-rgb: ${toRgb(mix(primary, primary, 15))} ;
        --bs-btn-active-color: ${color};
        --bs-btn-active-bg: ${primary};
        --bs-btn-active-border-color: ${primary};
        --bs-btn-disabled-color: ${primary};
        --bs-btn-disabled-border-color: ${primary};
    }

    .form-range:focus::-webkit-slider-thumb{
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(${toRgb(primary)}, 0.25);
    }

    .form-range:focus::-moz-range-thumb {
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(${toRgb(primary)}, 0.25);
    }

    .form-range::-webkit-slider-thumb:active,
    .form-range::-webkit-slider-thumb:focus{
        background-color: ${primary};
        box-shadow: 0 0 0 0.25rem rgba(${toRgb(primary)}, 0.25);
    }

    .form-range::-webkit-slider-thumb {
        background-color: ${primary};
    }

    .form-range::-moz-range-thumb {
        background-color: ${primary};
    }

    .form-control:focus,
    .form-select:focus,
    .form-check-input:focus {
        border-color: ${tintColor(primary, 50)};
        box-shadow: 0 0 0 0.25rem rgba(${toRgb(primary)}, 0.25);
    }

    .form-check-input:checked,
    .form-check-input:checked,
    .form-check-input[type=checkbox]:indeterminate {
        background-color: ${primary};
        border-color: ${primary};
    }


    .dropdown-menu {
        --bs-dropdown-link-active-color: ${colorContrast(primary)};
        --bs-dropdown-link-active-bg: ${primary};
    }

    .form-switch .form-check-input:focus {
       --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='${encodeURIComponent(tintColor(primary, 50))}'/%3e%3c/svg%3e");
    }

    .nav-pills {
        --bs-nav-pills-link-active-color: ${colorContrast(primary)};
        --bs-nav-pills-link-active-bg: ${primary};
    }

    .pagination {
        --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(${toRgb(primary)}, 0.25);
        --bs-pagination-active-color: ${colorContrast(primary)};;
        --bs-pagination-active-bg: ${primary};
        --bs-pagination-active-border-color: ${primary};
    }

    .progress,
    .progress-stacked {
        --bs-progress-bar-color: ${colorContrast(primary)};;
        --bs-progress-bar-bg: ${primary};
    }

    .list-group {
        --bs-list-group-active-color: ${colorContrast(primary)};;
        --bs-list-group-active-bg: ${primary};
        --bs-list-group-active-border-color: ${primary};
    }

    .text-bg-primary {
        color: ${color} !important;
        background-color: RGBA(${toRgb(primary)}, var(--bs-bg-opacity, 1)) !important; 
    }

    .link-primary:hover, .link-primary:focus {
        color: RGBA(${toRgb(shadeColor(primary, 20))}, var(--bs-link-opacity, 1));
        -webkit-text-decoration-color: RGBA(${toRgb(shadeColor(primary, 20))}, var(--bs-link-underline-opacity, 1));
        text-decoration-color: RGBA(${toRgb(shadeColor(primary, 20))}, var(--bs-link-underline-opacity, 1));
    }`;

    console.log(styleElement.innerHTML)
}