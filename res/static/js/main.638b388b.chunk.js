(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],{101:function(e,t,a){var n={"./135cipher":70,"./135cipher.jsx":70};function r(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=101},316:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),o=a.n(i),l=(a(93),a(30)),c=a(27),s=a.n(c),u=a(37),m=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_API_URL||"/api";function h(){return(h=Object(u.a)(s.a.mark((function e(t,a,n,r,i){var o,l,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="".concat(m,"/").concat(t),e.next=3,fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:n,content:r,operation:a,extras:i||[]})});case 3:return l=e.sent,e.next=6,l.json();case 6:if(c=e.sent,200===l.status){e.next=9;break}return e.abrupt("return","".concat(a.charAt(0).toUpperCase()+a.slice(1),'ion of "').concat(r,'" failed.'));case 9:return e.abrupt("return",c.message);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var p=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_API_URL||"/api";function d(){return(d=Object(u.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(p,"/funcs"),e.next=3,fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}});case 3:return a=e.sent,e.next=6,a.json();case 6:if(n=e.sent,200===a.status){e.next=9;break}return e.abrupt("return",[]);case 9:return e.abrupt("return",n);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var f=a(77),g=a(355),b=a(358),y=a(14),E=(a(95),a(54)),v=a(11),w=function(e){return r.a.createElement("div",{className:"pageContent"},r.a.createElement("h1",null,"About this site"),r.a.createElement("p",null,"Information about the 135code website"))};function _(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"pageContent"},r.a.createElement("p",{className:"fullDetails"},r.a.createElement("b",null,"Disclaimer:"),r.a.createElement("br",null),"This Website represents a project done for fun and is not intended for any kind of commercial use or security use. We strive to keep our Website safe, secure, and functioning properly, but we cannot guarantee the continuous operation of or access to our Website. Furthermore, we may change the functionality of any part of our website at any time without notice. You agree that you are making use of our Website at your own risk, and that the Website and its functionality is available for use on an \u201cAS IS\u201d and \u201cAS AVAILABLE\u201d basis. Accordingly, to the fullest extent permitted by applicable law, we accept no liability for any damages, direct, indirect or consequential, arising out of any kind of usage of or reliance upon this Website or the functionality contained within.")),r.a.createElement(y.b,{to:"/"},"To homepage"))}function x(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"pageContent"},r.a.createElement("p",{className:"fullDetails"},r.a.createElement("b",null,"Privacy Policy:"),r.a.createElement("br",null),"Our website does not store any user data. Any data entered or generated by the user is only held in memory during processing and is not permanently stored.")),r.a.createElement(y.b,{to:"/"},"To homepage"))}function T(e){return r.a.createElement("div",{className:"pageContent"},r.a.createElement("h1",null,"Page not found"),r.a.createElement("br",null),r.a.createElement(y.b,{to:"/"},"Return to homepage"))}function k(e){return RegExp("[a-zA-Z]").test(e[0])?e[0].toUpperCase()+e.substring(1,e.length):e}var F=function(e){return r.a.createElement("div",{className:"pageContent"},r.a.createElement("h1",null,k(e.module)," is coming soon!"),r.a.createElement("br",null),r.a.createElement(y.b,{to:"/"},"Back to homepage"))};function C(e){try{return a(101)("./".concat(e))}catch(t){return{default:function(t){return r.a.createElement(F,{module:e})},About:function(t){return r.a.createElement(F,{module:e})}}}}function N(e){var t=e.mod,a=e.modName,n=Object(E.a)(e,["mod","modName"]);return r.a.createElement(v.c,null,r.a.createElement(v.a,{path:"*/about"},[t.About(n),r.a.createElement(y.b,{to:"/".concat(a)},"Back to ",a)]),r.a.createElement(v.a,{path:"/"},[t.default(n),r.a.createElement(y.b,{to:"/".concat(a,"/about")},"About ",a)]))}function O(e){return r.a.createElement(v.c,null,r.a.createElement(v.a,{exact:!0,path:"/disclaimer"},r.a.createElement(_,null)),r.a.createElement(v.a,{exact:!0,path:"/privacy"},r.a.createElement(x,null)),r.a.createElement(v.a,{exact:!0,path:"/"},r.a.createElement(w,e)),Object.entries(e.state.funcs.value).map((function(t){return r.a.createElement(v.a,{key:t[1],path:"/".concat(t[0])},r.a.createElement(N,Object.assign({mod:C(t[0]),modName:t[0]},e)))})),r.a.createElement(v.a,{path:"/"},e.state.funcs.value.unloaded?r.a.createElement("div",{className:"pageContent"},"Loading functions..."):r.a.createElement(T,null)))}a(360);var S=a(356),P=a(361),q=a(357);function I(e){return{id:"scrollable-force-tab-".concat(e),"aria-controls":"scrollable-force-tabpanel-".concat(e)}}var A=Object(g.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper}}}));function j(e){var t=A(),a=Object(v.f)(),i=r.a.useState(0),o=Object(l.a)(i,2),c=o[0],s=o[1],u=e.children.slice(0,-1).concat(e.children.slice(-1)[0]);function m(e,t){try{return e[t][0].key}catch(a){return e[t].key}}return Object(n.useEffect)((function(){var e=u.map((function(e,t){return m(u,t)})).indexOf(a.location.pathname.split("/")[1]);e>=0&&s(e)}),[a,u]),r.a.createElement("div",{className:t.root,style:{position:"fixed",top:"0"}},r.a.createElement(S.a,{position:"static",color:"default"},r.a.createElement(P.a,{value:c,onChange:function(e,t){s(t),a.push("/".concat(m(u,t)))},variant:"scrollable",scrollButtons:"on",indicatorColor:"primary",textColor:"primary","aria-label":"scrollable force tabs example"},u)))}var L=function(e){return r.a.createElement(j,e,r.a.createElement(q.a,Object.assign({key:"",label:"Home"},I(0))),Object.entries(e.funcNames).filter((function(e){return"string"===typeof e[1]})).map((function(t){return r.a.createElement(q.a,Object.assign({key:t[1],label:t[0]},I(Object.entries(e.funcNames).indexOf(t)+1)))})))};function R(e,t,a,n,r,i,o,l){if(""===e||""===t)return alert("Sorry, you must input a key and content to ".concat(a,".")),r.value;i(!0),o("".concat(k(a),"ed result")),function(e,t,a,n,r){return h.apply(this,arguments)}(n,a,e,t,l).then((function(e){i(!1),r.set(e)})).catch((function(e){r.set("Failed"),i(!1)}))}var B=Object(f.a)({palette:{type:"dark",weak:{main:"#62757f",contrastText:"#ffffff"}}}),D=Object(g.a)((function(e){return{root:{"& .MuiTextField-root":{color:"#ffffff",margin:e.spacing(1),width:"25ch"}}}})),W={cipher135:"135cipher"},G=function(e){var t=Object(n.useState)(e),a=Object(l.a)(t,2);return{value:a[0],set:a[1]}};var K=function(){var e={classes:D(),factor:G(""),content:G(""),result:G(""),resLabel:G("Result"),funcs:G({unloaded:!0}),loading:G(!1),sendInput:R},t=e.funcs.set;return Object(n.useEffect)((function(){(function(){return d.apply(this,arguments)})().then((function(e){var a=[{}].concat(e).reduce((function(e,t){return e[W[t]||t]=t,e}));t(a)}))}),[t]),r.a.createElement(y.a,{basename:"/"},r.a.createElement(b.a,{theme:B},r.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}),r.a.createElement("header",{className:"App-header App"},r.a.createElement(L,{funcNames:e.funcs.value}),r.a.createElement(O,{state:e}),r.a.createElement("div",{className:"disclaimer"},r.a.createElement("span",{style:{float:"left"}},"Disclaimer: Use at your own risk, ",r.a.createElement(y.b,{to:"/disclaimer"},"read full disclaimer"),"."),r.a.createElement("span",{style:{float:"right"}}," ",r.a.createElement(y.b,{to:"/privacy"},"Privacy Policy"))),r.a.createElement("div",{className:"credits"},"Made by Jamal135 and Liran Piade, 2020"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},70:function(e,t,a){"use strict";a.r(t),a.d(t,"About",(function(){return N}));var n=a(27),r=a.n(n),i=a(30),o=a(37),l=a(0),c=a.n(l),s=a(319),u=a(353),m=a(359),h=a(349),p=a(352),d=a(74),f=a.n(d);function g(e){var t=c.a.useState(!1),a=Object(i.a)(t,2),n=a[0],r=a[1];return c.a.createElement("div",null,c.a.createElement(h.a,{className:n?"advanced_options_expanded":"advanced_options",onClick:function(){r(!n)},"aria-expanded":n,"aria-label":"show options"},c.a.createElement("span",{className:"ExpandLabel"},"Advanced Options"),c.a.createElement(f.a,null)),c.a.createElement(p.a,{in:n,timeout:"auto"},e.children))}var b=a(362),y=a(36),E=a(11),v=a(354),w=a(364),_=a(363),x=function(e){return c.a.createElement("div",{className:"completeTag"},"Complete")};function T(e){var t=c.a.useRef(null);return c.a.createElement("span",{ref:t},c.a.createElement(m.a,{noValidate:!0,multiline:!0,value:e.result,label:e.resLabel,onFocus:F,onClick:F,inputProps:{readOnly:"readonly"},id:"OutputField"}),c.a.createElement(s.a,{style:{marginTop:"10pt"},color:"default",onClick:function(){t.current.firstChild.lastChild.firstChild.select(),document.execCommand("Copy")}},"Copy to clipboard"))}function k(e){var t=c.a.useRef(null);return c.a.createElement("span",{ref:t},c.a.createElement(m.a,{id:"Text",label:"Text to encrypt/decrypt",multiline:!0,rowsMax:8,value:e.text,onChange:function(t){e.setText(t.target.value)}}),c.a.createElement(s.a,{style:{marginTop:"16pt",marginLeft:"-5pt"},tabIndex:"-1",color:"default",onClick:function(){t.current.firstChild.lastChild.firstChild.select(),e.setText("")}},"Clear"))}function F(e){return C.apply(this,arguments)}function C(){return(C=Object(o.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!==t.target.value)try{t.target.select()}catch(a){}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){var t=Object(E.f)();return c.a.createElement("div",{className:"pageContent about"},c.a.createElement("h1",{style:{marginBottom:"5pt"}},"135Cipher Information"),c.a.createElement(s.a,{variant:"outlined",color:"secondary",onClick:function(){return t.push("/135cipher")},style:{marginBottom:"20pt"}},"135Cipher"),c.a.createElement("br",null),"Initial Creation Date: 25/05/2020",c.a.createElement("br",null),"Designed by: Jamal135",c.a.createElement("br",null),c.a.createElement("h2",null,"Overview:"),c.a.createElement("p",null,"The 135Cipher is a symmetric algorithm created in Python that involves both transposition and substitution steps. Whilst originally intended for English plain text encryption, the scope of this cipher expanded to allow for broader potential application. This encryption algorithm accepts all characters supported by base64 as input text and can support a decimal key up to 135 characters long. The security of this algorithm is unknown and untested, as such it should not be utilised in any commercial or personal application. This algorithm currently has no intended practical application and is purely a recreational interest. A simplified summary of how the algorithm works is illustrated within Figure 1, below."),c.a.createElement("b",null,"Figure 1:",c.a.createElement("br",null),"Encryption Process Overview"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Encryption Process Overview",src:"/135cipherInfo/figure_1.png"})),c.a.createElement("h2",null,"Base64 Encoding:"),c.a.createElement("p",null,"This cipher utilises utf-8 Base64 encoding to support virtually all inputs. An example of base64 encoding can be seen below in Figure 2."),c.a.createElement("b",null,"Figure 2:",c.a.createElement("br",null),"Example Base64 Encoding:"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"General Transposition",src:"/135cipherInfo/figure_2.png"})),c.a.createElement("p",null,"Note: Base64 in this case is intended to allow support for non ASCII characters, which is not demonstrated in this example. The Python code implementation for this can be seen in Figure 3, below."),c.a.createElement("b",null,"Figure 3:",c.a.createElement("br",null),"Base64 Encoding Code"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"        #Encode compressed text into Base64.\n        encode_string = text.encode('utf-8')\n        encoded_byte_string = base64.b64encode(encode_string)\n        encoded_string = encoded_byte_string.decode('utf-8')")),c.a.createElement("h2",null,"Transposition:"),c.a.createElement("p",null,"This transpositional step is indicative of a matrix transposition and concerns the rearranging of the input. The part that matters in this algorithm is the method of grouping. By default, the input will be arranged into a matrix of two-character rows with as many columns as necessary. This is referred to as a General Transposition (seen in Figure 4), and is done unless the Random Transposition advanced option is enabled."),c.a.createElement("b",null,"Figure 4:",c.a.createElement("br",null),"General Transposition:"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"General Transposition",src:"/135cipherInfo/figure_4.png"})),c.a.createElement("p",null,"The General Transposition, used by default, is intended to obscure patterns which may be present in the input text. This ensures the input text is generalised and is in theory more difficult to link back to any particular input. If during the General Transposition, the length of one row is shorter than the other, a \u2018_\u2019 (noise) will be appended to ensure both rows are of equal length."),c.a.createElement("p",null,"The Random Transposition is instead used if the random noise argument is enabled in the advanced options. The random noise transposition splits the text by randomly inserting \u201c_\u201ds into the input. These underscores are then used as breaking points for each column. Additional underscores are then appended to every row to ensure all rows are as long as the longest row. This adds noise, scrambles the order, and increases the input length, causing new unique shifting values to be calculated for all characters during the substitution step. This is intended to prevent any kind of dictionary attack by allowing many encrypted variants of the same input at the expense of greater length. Random transposition is illustrated in Figure 5.",c.a.createElement("br",null),"Note: If random transposition is enabled for encryption, this option does not need to be enabled for decryption to succeed, as a minor key is appended which describes the number of rows that the text was grouped into for the transposition of the text (prior to substitution)."),c.a.createElement("b",null,"Figure 5:",c.a.createElement("br",null),"Random Transposition:"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"General Transposition",src:"/135cipherInfo/figure_5.png"})),c.a.createElement("p",null,"In Figure 6, you can see the Python code implementation of how the input text is split by the algorithm with respect to which transposition method is selected."),c.a.createElement("b",null,"Figure 6:",c.a.createElement("br",null),"Transposition Grouping Code"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"    #Random insert spaces.\n    if argument == '+':\n        number_groups = random.randint(3, 15)\n        for _ in range(number_groups):\n            position = random.randint(1, len(input_text) - 2)\n            split_text.insert(position, \" \")\n \n    #Regular insert spaces.\n    if argument == '-':\n        number_groups = 2\n        split = int((len(input_text)) / number_groups)\n        split_text.insert(split, \" \")")),c.a.createElement("h2",null,"Substitution:"),c.a.createElement("p",null,"This is the both the most complex and important step within the algorithm. Like a standard substitution cipher, this step involves taking the position of a selected character in a sequence and shifting down the sequence by a value to find the replacement character. Whilst this simple concept is demonstrated in Figure 7, this algorithm has a more advanced implementation such that individual shifting values and shifting sequences are generated for every character. Additionally, the position of the previous replacement character impacts the shifting value for the next character."),c.a.createElement("b",null,"Figure 7:",c.a.createElement("br",null),"Basic Substitution Example"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Basic Substitution Example",src:"/135cipherInfo/figure_7.png"})),c.a.createElement("p",null,"Whilst a lot of this algorithm is built to leverage the Python Random standard library, the generation of shifting values instead relies on a complex implementation of the formula illustrated in Figure 8.",c.a.createElement("br",null),"Note: Key refers to the input key for encryption/decryption (factor). Val refers to a position in a list, and Length refers to the total length of the shifting sequence (alpha_sequence_length). Additionally, the value is rounded to a whole number."),c.a.createElement("b",null,"Figure 8:",c.a.createElement("br",null),"Shifting Formula"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Shifting Formula",src:"/135cipherInfo/figure_8.png"})),c.a.createElement("p",null,"This same shifting formula implemented in Python code can be seen in Figure 9. Showing this function is important in order to allow proper explanation of the full shifting value calculation process, which involves code that refers to this function."),c.a.createElement("b",null,"Figure 9:",c.a.createElement("br",null),"Python Shifting Formula"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"  #Define calculation function for use in factoring function.\n  def calculation(factor, alpha_sequence_length, val):\n \n    factor_differential = factor + 1\n    calculation = 135\n \n    calculation = int((val * factor) + (((val * factor_differential)\n                  / alpha_sequence_length)) - (((10 * val) - \n                  (9 * val)) / (val / 6)))\n    \n    return calculation")),c.a.createElement("p",null,"The complete implementation of the number calculation within the algorithm can be broken down into two parts. Part one is illustrated in Figure 10, and shows the calculation of one very large number leveraging the pre-established shifting formula three times. Note: Primary Factor refers to the Factor (Key), and Secondary Factor refers to the Factor divided by four (Key/4)."),c.a.createElement("b",null,"Figure 10:",c.a.createElement("br",null),"Python Factoring Part One"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"    #Calculation\n    for count in range(number_characters):\n        #Complete calculations\n        primary_calculation = calculation(primary_factor, \n                              alpha_sequence_length, \n                              count + 1)\n        \n        inverse_count = ((count - 1) % number_characters) + 1\n \n        secondary_calculation = calculation(secondary_factor, \n                                alpha_sequence_length, \n                                inverse_count)\n \n        combined_calculation = primary_calculation - \n                               secondary_calculation\n        \n        if combined_calculation == 0:\n            combined_calculation = 1\n \n        output_calculation = int(calculation(primary_factor, \n                             alpha_sequence_length, \n                             combined_calculation))")),c.a.createElement("p",null,"The large number calculated from part one is then taken and broken into two parts which are calculated together to produce a new number (magic_c), shown in Figure 11. A small part of this large number is cut off to be used as the final calculated shifting value. Then the final shifting value of the previous number (or 135 initially), is added to this number. Finally, the remainder of the number divided into the alpha sequence length (modulo operation) is found, to know the amount along the sequence the character should be shifted."),c.a.createElement("b",null,"Figure 11:",c.a.createElement("br",null),"Python Factoring Part Two"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"        #Take parts of output calculation.\n        magic_a = int(str(output_calculation)[-9:])\n        magic_b = int(str(output_calculation)[:8])\n        magic_c = ((magic_a * magic_b) + (primary_factor^2))\n        magic_output = int(str(magic_c)[-9:])\n \n        #Add previous output number to current value.\n        combined_output = magic_output + previous_output\n        \n        #Find remainder.\n        final_output =  combined_output % alpha_sequence_length\n \n        #Obscure potential even/odd patterns.\n        if count % 2 == 0:\n            final_output = final_output + 1")),c.a.createElement("p",null,"This entire calculation process illustrated in Figures 10 and 11 is completed for every character in the input text (after the transposition stage). With each character, a new Val value is entered to ensure a new shifting value is generated despite the Key and Length values remaining unchanged.",c.a.createElement("br",null),"In addition to the shifting value that is calculated for every character in the input, a unique sequence is generated for each character to shift along by the calculated value. To achieve this, the Python Random standard library is leveraged to seed a random re-arrangement of the pre-defined character_list, as shown in Figure 12."),c.a.createElement("b",null,"Figure 12:",c.a.createElement("br",null),"Python Sequence Generator"),c.a.createElement("div",{className:"box"},c.a.createElement(b.a,{language:"python",style:y.a},"#Use input to generate alphabetical sequence.\ndef generate_alpha_sequence(input):\n    \n    #List of all supported characters\n    character_list = ['E', 'I', 'p', '7', '3', 'Q', 'V', 'A', '0', \n                     'm', 'j', 'x', 'v', 'J', '9', 'H', 'M', 'F', \n                     'f', 'T', 'n', 'D', 'S', '6', 'Y', 'k', '5', \n                     'o', '/', 'U', 'w', 'c', 'h', 'd', 'l', 'L', \n                     'z', 'X', '+', 's', 'R', 'g', 'b', 'r', 'O', \n                     '1', 'B', 'e', 'P', 'y', 'a', 'C', 't', 'Z', \n                     'K', 'W', 'i', 'N', '8', 'G', '=', 'u', '4', \n                     'q', '2']\n \n    length = len(character_list)\n \n    #Generation of seeded alphabetical sequence using input.\n    random.seed(input)\n    alphabetical_sequence = (random.sample(character_list, length))\n \n    return alphabetical_sequence")),c.a.createElement("p",null,"In order for this sequence generator to work, a unique input argument must be provided for every sequence that needs to be generated (in this case one per character in the provided input text). To achieve this, the formula shown in Figure 13 is used. In this formula Key is the encryption/decryption key and count refers to the current character out of the total characters (\u201c2\u201d out of 25 for example)."),c.a.createElement("b",null,"Figure 13:",c.a.createElement("br",null),"Sequence Input Formula"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Sequence Input Formula",src:"/135cipherInfo/figure_13.png"})),c.a.createElement("p",null,"With the shifting values and shifting sequences calculated for every character, the first shift will occur. The process is simple, the position of the selected character will be indexed in the calculated sequence for that character (number corresponding to position). Then the calculated shift value for the selected character will be added to the indexed position number as well as the new indexed position number of the previous character. This formula is shown in Figure 14."),c.a.createElement("b",null,"Figure 14:",c.a.createElement("br",null),"New Position Formula:"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Sequence Input Formula",src:"/135cipherInfo/figure_14.png"})),c.a.createElement("p",null,"Involving the index value of the previous new position in the calculation of the next new position ensures that any change in input (when using the same key), results in every character after that change being encrypted with new values. This means any change to the input always results in a newly calculated final character. Leveraging this fact, the position of the final character will be indexed for a secondary shift value in a sequence generated with the formula of Figure 13 where Count is equal to zero (base sequence). Then, every other character (except the final character), will be shifted along their respective calculated sequences by this secondary shift value. This completes the butterfly effect by ensuring any change in any part of the input results in a completely different encrypted output despite the Key value being the same. A summary of this two step shifting process can be found in Figure 15, below."),c.a.createElement("b",null,"Figure 15:",c.a.createElement("br",null),"Shifting Process"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Sequence Input Formula",src:"/135cipherInfo/figure_15.png"})),c.a.createElement("h2",null,"Summary"),c.a.createElement("p",null,"In summary, this is a symmetric and deterministic encryption algorithm with a built in butterfly effect such that any change of key or input completely changes the output. Given the deterministic nature of this algorithm, the transposition step can be made random to allow variation of output for the same key and input. The algorithm works by Base64 encoding an input, shuffling it through a half split two row transposition, then every character is shifted by an individually calculated shift list on an individually generated character sequence. Finally, all characters are shifted (except the last character) again on their same respective sequences by a set value given by the index of the final character. Even if my approach to the functions in this algorithm may be ineffective, there may still be value in this kind of approach as generalised in Figure 16, below."),c.a.createElement("b",null,"Figure 16:",c.a.createElement("br",null),"Generalised Process"),c.a.createElement("div",{className:"box"},c.a.createElement("img",{alt:"Sequence Input Formula",src:"/135cipherInfo/figure_16.png"})),c.a.createElement("p",null,"As a first dive into Python coding and encryption, this was a very enjoyable project to work on. Though it should again be noted, the security of this algorithm is untested and has been created by a novice who is new to the field."),c.a.createElement("p",{className:"uncentred"},"Publication Date:      20/09/2020"),c.a.createElement("p",{className:"uncentred"},"Date Last Modified:   20/09/2020"))}t.default=function(e){var t=e.state,a=t.factor,n=t.content,r=t.result,o=t.loading,h=t.resLabel,p=t.classes,d=t.sendInput,f=Object(l.useState)(!1),b=Object(i.a)(f,2),y=b[0],F=b[1],C=Object(E.f)(),N=function(e){return r.set(d(a.value,n.value,e,"135cipher",r,o.set,h.set,[y?"+":"-"]))};return c.a.createElement("div",{className:"pageContent"},c.a.createElement("h1",{style:{marginBottom:"-15pt"}},"135Cipher"),c.a.createElement("p",{className:"smallText"},"Symmetric Encryption Algorithm"),c.a.createElement(s.a,{variant:"outlined",color:"secondary",onClick:function(){return C.push("/135cipher/about")},style:{marginBottom:"20pt"}},"About"),c.a.createElement("form",{className:p.root,noValidate:!0,autoComplete:"off",onSubmit:function(e){N("encrypt"),e.preventDefault()}},c.a.createElement("div",null,c.a.createElement(m.a,{id:"keyField",label:"key",inputMode:"numeric",value:a.value,onChange:function(e){e.target.value.length>135?alert("Key must be up to 135 characters long."):RegExp("^\\d*$").test(e.target.value)?a.set(e.target.value):alert("You can only input a whole number as the key.")}}),c.a.createElement(k,{text:n.value,setText:n.set})),c.a.createElement(u.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},c.a.createElement(s.a,{onClick:function(e){return N("encrypt")}},"Encrypt"),c.a.createElement(s.a,{onClick:function(e){return N("decrypt")}},"Decrypt"))),c.a.createElement(x,null),c.a.createElement(T,{result:o.value?"Loading...":r.value||"",resLabel:h.value}),c.a.createElement(c.a.Fragment,null,c.a.createElement("br",null),c.a.createElement(v.a,{color:"primary",className:o.value?null:"hidden"})),c.a.createElement(g,null,c.a.createElement(w.a,{control:c.a.createElement(_.a,{value:y,onChange:function(e){F(!y)}}),label:"Random Noise Pattern"})))}},88:function(e,t,a){e.exports=a(316)},93:function(e,t,a){},95:function(e,t,a){}},[[88,1,2]]]);
//# sourceMappingURL=main.638b388b.chunk.js.map