// JavaScript gilabert.design

document.addEventListener('DOMContentLoaded', function() {

  var email = document.getElementById('email-link');

  email.addEventListener('click', function() {
    var letter = decode("znvygb:enzba@tvynoreg.qrfvta");
    var subject = decode("Uryyb gurer! :)");
    var reference = letter + '?subject=' + subject;

    email.href = reference;
  });

  function decode(letters) {
    return letters.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode((c <= "Z" ? 90 : 122)
      >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    })
  }
});
