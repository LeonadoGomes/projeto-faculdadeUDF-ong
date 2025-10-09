
  function formatBRPhone(value) {
    // remove não-dígitos e limita a 11 (BR)
    const v = value.replace(/\D/g, '').slice(0, 11);
    if (!v) return '';

    // (DD) 9999-9999  (até 10 dígitos)  |  (DD) 99999-9999 (11 dígitos)
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.slice(0,2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
    return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7,11)}`;
  }

  function handlePhoneInput(el) {
    const old = el.value;
    const start = el.selectionStart ?? old.length;

    // formata
    el.value = formatBRPhone(old);

    // ajuste simples do cursor pra não “pular” demais
    // (opcional; remove se preferir)
    const onlyDigitsOld = (old.match(/\d/g) || []).length;
    const onlyDigitsNew = (el.value.match(/\d/g) || []).length;
    const diff = onlyDigitsNew - onlyDigitsOld;
    const newPos = Math.max(0, start + (diff > 0 ? 1 : 0));
    try { el.setSelectionRange(newPos, newPos); } catch(_) {}
  }

  // Exemplo: preencher com 38999817020 já formatado
  const tel = document.getElementById('telefone');
  tel.value = formatBRPhone('38999817020'); // -> (38) 99981-7020
