const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// https://en.wikipedia.org/wiki/List_of_mobile_telephone_prefixes_by_country

let table = `<table class="wikitable sortable jquery-tablesorter">

<thead><tr>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Country or unrecognized territory</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Interna-<br>tional<br>Calling<br>Code</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending"><abbr title="Mobile Prefix">Mobile Prefix</abbr> <sup id="cite_ref-prefix_note_1-0" class="reference"><a href="#cite_note-prefix_note-1">[notes 1]</a></sup></th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending"><abbr title="National (Significant) Number">Size of<br>NN (NSN)</abbr> <sup id="cite_ref-nsn_note_2-0" class="reference"><a href="#cite_note-nsn_note-2">[notes 2]</a></sup></th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Carrier</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Notes
</th></tr></thead><tbody>
<tr>
<td rowspan="10"><a href="/wiki/Afghanistan" title="Afghanistan">Afghanistan</a><sup id="cite_ref-3" class="reference"><a href="#cite_note-3">[1]</a></sup></td>
<td rowspan="10"><a href="/wiki/%2B93" class="mw-redirect" title="+93">+93</a></td>
<td>70</td>
<td rowspan="10">9</td>
<td rowspan="2"><a href="/wiki/Afghan_Wireless" title="Afghan Wireless">AWCC</a>
</td>
<td rowspan="2">www.afghan-wireless.com
</td></tr>
<tr>
<td>71
</td></tr>
<tr>
<td>72
</td>
<td><a href="/wiki/Roshan_(telco)" title="Roshan (telco)">Roshan</a>
</td>
<td>www.roshan.af
</td></tr>
<tr>
<td>73
</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a>
</td>
<td>www.etisalat.af
</td></tr>
<tr>
<td>74
</td>
<td>SALAAM (state owned)
</td>
<td>www.salaam.af
</td></tr>
<tr>
<td>75</td>
<td><a href="/wiki/Afghan_Telecom" title="Afghan Telecom">Afghan Telecom</a> (state owned)</td>
<td>www.afghantelecom.af
</td></tr>
<tr>
<td>24
</td>
<td rowspan="2"><a href="/wiki/MTN_Group" title="MTN Group">MTN</a>
</td>
<td rowspan="2">www.mtn.com.af
</td></tr>
<tr>
<td>77
</td></tr>
<tr>
<td>78</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a></td>
<td>www.etisalat.af
</td></tr>
<tr>
<td>79</td>
<td><a href="/wiki/Roshan_(telco)" title="Roshan (telco)">Roshan</a></td>
<td>www.roshan.af
</td></tr>
<tr>
<td><a href="/wiki/%C3%85land_Islands" title="Åland Islands">Åland Islands</a></td>
<td>+358</td>
<td><a href="/wiki/Telephone_numbers_in_%C3%85land" title="Telephone numbers in Åland">457</a></td>
<td>10</td>
<td></td>
<td>See <a href="#Finland">Finland</a>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Albania" title="Albania">Albania</a><sup id="cite_ref-4" class="reference"><a href="#cite_note-4">[2]</a></sup>
</td>
<td rowspan="4"><a href="/wiki/%2B355" class="mw-redirect" title="+355">+355</a>
</td></tr>
<tr>
<td>67</td>
<td></td>
<td><a href="/wiki/ALBtelecom_Mobile" title="ALBtelecom Mobile">ALBtelecom</a></td>
<td>
</td></tr>
<tr>
<td>68</td>
<td></td>
<td><a href="/wiki/One_Telecommunications" title="One Telecommunications">One.al</a></td>
<td>
</td></tr>
<tr>
<td>69</td>
<td></td>
<td><a href="/wiki/Vodafone_Albania" title="Vodafone Albania">Vodafone</a></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Algeria" title="Algeria">Algeria</a></td>
<td rowspan="3"><a href="/wiki/%2B213" class="mw-redirect" title="+213">+213</a></td>
<td>5</td>
<td rowspan="3">9</td>
<td>Nedjma Telecom</td>
<td>+213 5 xx xx xx xx
</td></tr>
<tr>
<td>6</td>
<td>Mobilis-Algerie Telecom</td>
<td>+213 6 xx xx xx xx
</td></tr>
<tr>
<td>7</td>
<td>Orascom Telecom Algerie</td>
<td>+213 7 xx xx xx xx
</td></tr>
<tr>
<td><a href="/wiki/American_Samoa" title="American Samoa">American Samoa</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_684" title="Area code 684">684</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Andorra" title="Andorra">Andorra</a></td>
<td><a href="/wiki/%2B376" class="mw-redirect" title="+376">+376</a></td>
<td>3</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Angola" title="Angola">Angola</a></td>
<td rowspan="3"><a href="/wiki/%2B244" class="mw-redirect" title="+244">+244</a></td>
<td>91</td>
<td rowspan="3">?</td>
<td><a href="/w/index.php?title=MOVICEL_-_CDMA&amp;action=edit&amp;redlink=1" class="new" title="MOVICEL - CDMA (page does not exist)">MOVICEL - CDMA</a></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td rowspan="2"><a href="/w/index.php?title=UNITEL_-_GSM&amp;action=edit&amp;redlink=1" class="new" title="UNITEL - GSM (page does not exist)">UNITEL - GSM</a></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Anguilla" title="Anguilla">Anguilla</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_264" title="Area code 264">264</a> 772</td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member
</td></tr>
<tr>
<td><a href="/wiki/Antigua_and_Barbuda" title="Antigua and Barbuda">Antigua and Barbuda</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_268" title="Area code 268">268</a> 7xx</td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member
</td></tr>
<tr>
<td><a href="/wiki/Argentina" title="Argentina">Argentina</a></td>
<td><a href="/wiki/%2B54" class="mw-redirect" title="+54">+54</a></td>
<td>9/15</td>
<td>?</td>
<td>All carriers: <a href="/wiki/Claro_(company)" title="Claro (company)">Claro</a>, <a href="/wiki/Movistar" title="Movistar">Movistar</a>, <a href="/wiki/Telecom_Argentina#Personal" title="Telecom Argentina">Personal</a>, <a href="/wiki/Tuenti" title="Tuenti">Tuenti</a></td>
<td>15 before the local number but after long distance area code for national calls (0 11 15 xxxx-xxxx) and 9 placed after the international access code excluding the 15 for international calls (+54 9 11 xxxx-xxxx).
</td></tr>
<tr>
<td rowspan="12"><span class="anchor" id="Armenia"></span><a href="/wiki/Armenia" title="Armenia">Armenia</a></td>
<td rowspan="12"><a href="/wiki/%2B374" class="mw-redirect" title="+374">+374</a></td>
<td>55</td>
<td rowspan="12">6</td>
<td rowspan="4">Ucom</td>
<td>
</td></tr>
<tr>
<td>95</td>
<td>
</td></tr>
<tr>
<td>41</td>
<td>
</td></tr>
<tr>
<td>44
</td>
<td>
</td></tr>
<tr>
<td>77</td>
<td rowspan="4"><a href="/w/index.php?title=VivaCell-MTS&amp;action=edit&amp;redlink=1" class="new" title="VivaCell-MTS (page does not exist)">VivaCell-MTS</a></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td>
</td></tr>
<tr>
<td>94</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td>
</td></tr>
<tr>
<td>91</td>
<td rowspan="3">Beeline Armenia</td>
<td>Users can now switch carriers and keep their cell phone numbers, including prefix.
</td></tr>
<tr>
<td>99</td>
<td>
</td></tr>
<tr>
<td>43
</td>
<td>
</td></tr>
<tr>
<td>97</td>
<td><a href="/w/index.php?title=Karabakh_Telecom&amp;action=edit&amp;redlink=1" class="new" title="Karabakh Telecom (page does not exist)">Karabakh Telecom</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Aruba" title="Aruba">Aruba</a></td>
<td><a href="/wiki/%2B297" class="mw-redirect" title="+297">+297</a></td>
<td>??</td>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Ascension_Island" title="Ascension Island">Ascension Island</a></td>
<td><a href="/wiki/%2B247" class="mw-redirect" title="+247">+247</a></td>
<td>??</td>
<td></td>
<td></td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Australia"></span><a href="/wiki/Australia" title="Australia">Australia</a></td>
<td><a href="/wiki/%2B61" class="mw-redirect" title="+61">+61</a></td>
<td>4</td>
<td>9</td>
<td>any</td>
<td>Although distinct <a href="/wiki/Telephone_numbers_in_Australia#Mobile_phone_numbers_(04,_05)" title="Telephone numbers in Australia">mobile prefixes are allocated to different providers</a>, the prefixes cannot be used to reliably determine the carrier, due to "<a href="/wiki/Mobile_number_portability" title="Mobile number portability">Number Porting</a>" from one network to another.
</td></tr>
<tr>
<td><span class="anchor" id="Australian_Antarctic_Territory"></span><a href="/wiki/Australian_Antarctic_Territory" title="Australian Antarctic Territory">Australian Antarctic Territory</a></td>
<td>+672</td>
<td><a href="/wiki/Telephone_numbers_in_the_Australian_Antarctic_Territory" title="Telephone numbers in the Australian Antarctic Territory">1x</a></td>
<td>9</td>
<td></td>
<td>See <a href="#Norfolk_Island">Norfolk Island</a>
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Austria" title="Austria">Austria</a></td>
<td rowspan="9"><a href="/wiki/%2B43" class="mw-redirect" title="+43">+43</a></td>
<td>650</td>
<td rowspan="5">10</td>
<td>T-Mobile Austria GmbH (telering)</td>
<td>
</td></tr>
<tr>
<td>660</td>
<td>Hutchison 3G Austria GmbH (drei)</td>
<td>
</td></tr>
<tr>
<td>664</td>
<td>mobilkom Austria AG (Mobilkom, A1)</td>
<td>
</td></tr>
<tr>
<td>676</td>
<td>T-Mobile Austria GmbH (T-Mobile, formerly max)</td>
<td>
</td></tr>
<tr>
<td>680</td>
<td>mobilkom Austria AG (Bob)</td>
<td>
</td></tr>
<tr>
<td>677</td>
<td rowspan="4">11</td>
<td>HoT (T-Mobile, formerly max)</td>
<td>
</td></tr>
<tr>
<td>681</td>
<td>YESSS! Telekommunikation GmbH</td>
<td>
</td></tr>
<tr>
<td>688</td>
<td>Tele2 Mobil</td>
<td>
</td></tr>
<tr>
<td>699</td>
<td>Hutchison 3G Austria GmbH (drei) formerly Orange Austria (Orange [formerly ONE], Yesss)</td>
<td>
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Azerbaijan" title="Azerbaijan">Azerbaijan</a></td>
<td rowspan="7"><a href="/wiki/%2B994" class="mw-redirect" title="+994">+994</a></td>
<td>41</td>
<td rowspan="7">9</td>
<td><a href="/wiki/Catel" class="mw-redirect" title="Catel">Catel</a></td>
<td>
</td></tr>
<tr>
<td>50</td>
<td><a href="/wiki/Azercell" title="Azercell">Azercell</a></td>
<td>
</td></tr>
<tr>
<td>51</td>
<td><a href="/wiki/Azercell" title="Azercell">Azercell</a></td>
<td>
</td></tr>
<tr>
<td>55</td>
<td><a href="/w/index.php?title=Bakcell&amp;action=edit&amp;redlink=1" class="new" title="Bakcell (page does not exist)">Bakcell</a></td>
<td>
</td></tr>
<tr>
<td>70</td>
<td><a href="/wiki/Nar_Mobile" title="Nar Mobile">Nar Mobile</a></td>
<td>
</td></tr>
<tr>
<td>77</td>
<td><a href="/wiki/Nar_Mobile" title="Nar Mobile">Nar Mobile</a></td>
<td>
</td></tr>
<tr>
<td>99</td>
<td><a href="/w/index.php?title=Bakcell&amp;action=edit&amp;redlink=1" class="new" title="Bakcell (page does not exist)">Bakcell</a></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Bahamas" class="mw-redirect" title="Bahamas">Bahamas</a></td>
<td rowspan="3">+1</td>
<td><a href="/wiki/Area_code_242" title="Area code 242">242</a> 35x</td>
<td rowspan="3">10</td>
<td></td>
<td rowspan="3"><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member
</td></tr>
<tr>
<td><a href="/wiki/Area_code_242" title="Area code 242">242</a> 45x</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Area_code_242" title="Area code 242">242</a> 55x</td>
<td>
</td></tr>
<tr>
<td rowspan="19"><a href="/wiki/Bahrain" title="Bahrain">Bahrain</a></td>
<td rowspan="19"><a href="/wiki/%2B973" class="mw-redirect" title="+973">+973</a></td>
<td>31</td>
<td rowspan="19">8</td>
<td>Royal Court</td>
<td rowspan="19">Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td>322</td>
<td>Batelco
</td></tr>
<tr>
<td>33</td>
<td rowspan="8">Viva
</td></tr>
<tr>
<td>340
</td></tr>
<tr>
<td>341
</td></tr>
<tr>
<td>343
</td></tr>
<tr>
<td>344
</td></tr>
<tr>
<td>345
</td></tr>
<tr>
<td>353
</td></tr>
<tr>
<td>355
</td></tr>
<tr>
<td>36</td>
<td rowspan="2">Zain
</td></tr>
<tr>
<td>377
</td></tr>
<tr>
<td>383</td>
<td rowspan="4">Batelco
</td></tr>
<tr>
<td>384
</td></tr>
<tr>
<td>388
</td></tr>
<tr>
<td>39
</td></tr>
<tr>
<td>663</td>
<td rowspan="3">Zain
</td></tr>
<tr>
<td>666
</td></tr>
<tr>
<td>669
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Bangladesh" title="Bangladesh">Bangladesh</a>
</td>
<td rowspan="7"><a href="/wiki/%2B880" class="mw-redirect" title="+880">+880</a>
</td>
<td>13xx
</td>
<td rowspan="7">10</td>
<td><a href="/wiki/GrameenPhone" class="mw-redirect" title="GrameenPhone">GrameenPhone</a></td>
<td rowspan="7">Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific
<p>carrier).
</p>
</td></tr>
<tr>
<td>14xx</td>
<td><a href="/wiki/Banglalink" title="Banglalink">Banglalink</a>
</td></tr>
<tr>
<td>15xx</td>
<td><a href="/wiki/Teletalk" class="mw-redirect" title="Teletalk">Teletalk</a>
</td></tr>
<tr>
<td>16xx</td>
<td><a href="/wiki/Airtel_Bangladesh" title="Airtel Bangladesh">Airtel</a>
</td></tr>
<tr>
<td>17xx</td>
<td><a href="/wiki/GrameenPhone" class="mw-redirect" title="GrameenPhone">GrameenPhone</a>
</td></tr>
<tr>
<td>18xx</td>
<td><a href="/wiki/Robi_(company)" title="Robi (company)">Robi</a>
</td></tr>
<tr>
<td>19xx</td>
<td><a href="/wiki/Banglalink" title="Banglalink">Banglalink</a>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Barbados" title="Barbados">Barbados</a></td>
<td rowspan="4">+1</td>
<td rowspan="4"><a href="/wiki/Area_code_246#Central_Office_Codes" title="Area code 246">246</a></td>
<td rowspan="4">10</td>
<td><a href="/wiki/AT%26T_Wireless" class="mw-redirect" title="AT&amp;T Wireless">AT&amp;T Wireless</a> (formerly)</td>
<td rowspan="4"><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Digicel" title="Digicel">Digicel</a>
</td></tr>
<tr>
<td><a href="/wiki/LIME_(Cable_%26_Wireless)" class="mw-redirect" title="LIME (Cable &amp; Wireless)">LIME</a>
</td></tr>
<tr>
<td><a href="/wiki/Sunbeach" title="Sunbeach">Sunbeach</a>
</td></tr>
<tr>
<td rowspan="12"><a href="/wiki/Belarus" title="Belarus">Belarus</a></td>
<td rowspan="12"><a href="/wiki/%2B375" class="mw-redirect" title="+375">+375</a></td>
<td>25</td>
<td rowspan="12">9</td>
<td>life:)</td>
<td rowspan="12">Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).
</td></tr>
<tr>
<td>29 1</td>
<td><a href="/wiki/A1_Belarus" title="A1 Belarus">A1</a>
</td></tr>
<tr>
<td>29 2</td>
<td>MTS
</td></tr>
<tr>
<td>29 3</td>
<td><a href="/wiki/A1_Belarus" title="A1 Belarus">A1</a>
</td></tr>
<tr>
<td>29 4</td>
<td>DIALLOG (not in use; closed in 2014)
</td></tr>
<tr>
<td>29 5</td>
<td>MTS
</td></tr>
<tr>
<td>29 6</td>
<td><a href="/wiki/A1_Belarus" title="A1 Belarus">A1</a>
</td></tr>
<tr>
<td>29 7</td>
<td>MTS
</td></tr>
<tr>
<td>29 8</td>
<td>MTS
</td></tr>
<tr>
<td>29 9</td>
<td><a href="/wiki/A1_Belarus" title="A1 Belarus">A1</a>
</td></tr>
<tr>
<td>33</td>
<td>MTS
</td></tr>
<tr>
<td>44</td>
<td><a href="/wiki/A1_Belarus" title="A1 Belarus">A1</a>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Belgium" title="Belgium">Belgium</a></td>
<td rowspan="4"><a href="/wiki/%2B32" class="mw-redirect" title="+32">+32</a></td>
<td>456</td>
<td rowspan="4">9</td>
<td>Unleashed (Mobile Vikings / JIM Mobile) (or other)</td>
<td rowspan="4">Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).
<p>If there is only +32.. followed by any other, shorter number, like +32 51 724859, this is the number of a normal phone, not a mobile.
</p>
</td></tr>
<tr>
<td>47x</td>
<td><a href="/wiki/Proximus" title="Proximus">Proximus</a> (or other)
</td></tr>
<tr>
<td>48x</td>
<td><a href="/wiki/Telenet_(Belgium)" title="Telenet (Belgium)">Telenet</a>/<a href="/wiki/Base_(mobile_telephony_provider)" title="Base (mobile telephony provider)">Base</a> (or other)
</td></tr>
<tr>
<td>49x</td>
<td><a href="/wiki/Orange_Belgium" title="Orange Belgium">Orange Belgium</a> (or other)
</td></tr>
<tr>
<td><a href="/wiki/Belize" title="Belize">Belize</a></td>
<td><a href="/wiki/%2B501" class="mw-redirect" title="+501">+501</a></td>
<td>6</td>
<td>7</td>
<td>Mobile Smart</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Benin" title="Benin">Benin</a></td>
<td><a href="/wiki/%2B229" class="mw-redirect" title="+229">+229</a></td>
<td>9x</td>
<td>6 to 9</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Bermuda" title="Bermuda">Bermuda</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_441" title="Area code 441">441</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Bhutan" title="Bhutan">Bhutan</a></td>
<td><a href="/wiki/%2B975" class="mw-redirect" title="+975">+975</a></td>
<td>17</td>
<td></td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Bolivia" title="Bolivia">Bolivia</a></td>
<td rowspan="2"><a href="/wiki/%2B591" class="mw-redirect" title="+591">+591</a></td>
<td>6</td>
<td rowspan="2">?<sup id="cite_ref-5" class="reference"><a href="#cite_note-5">[3]</a></sup></td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Bonaire" title="Bonaire">Bonaire</a></td>
<td><a href="/wiki/%2B599" class="mw-redirect" title="+599">+599</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>See <a href="#Curaçao_and_the_Caribbean_Netherlands">Curaçao and the Caribbean Netherlands</a>
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Bosnia_and_Herzegovina" title="Bosnia and Herzegovina">Bosnia and Herzegovina</a> (Bosnia-Herzegovina)</td>
<td rowspan="7"><a href="/wiki/%2B387" class="mw-redirect" title="+387">+387</a></td>
<td>60</td>
<td rowspan="7">8</td>
<td rowspan="3"><a href="/wiki/BH_Telecom" title="BH Telecom">BH Mobile</a></td>
<td>
</td></tr>
<tr>
<td>69</td>
<td>
</td></tr>
<tr>
<td>62</td>
<td>
</td></tr>
<tr>
<td>63</td>
<td><a href="/wiki/HT-ERONET" class="mw-redirect" title="HT-ERONET">Eronet</a></td>
<td>
</td></tr>
<tr>
<td>64</td>
<td><a href="/wiki/Hallo" class="mw-redirect" title="Hallo">Hallo</a></td>
<td>
</td></tr>
<tr>
<td>65</td>
<td rowspan="2"><a href="/wiki/Telekom_Srpske" class="mw-redirect" title="Telekom Srpske">m:tel</a></td>
<td>
</td></tr>
<tr>
<td>66</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Botswana" title="Botswana">Botswana</a></td>
<td><a href="/wiki/%2B267" class="mw-redirect" title="+267">+267</a></td>
<td>7</td>
<td>?</td>
<td>Mascom</td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Brazil" title="Brazil">Brazil</a></td>
<td rowspan="4"><a href="/wiki/%2B55" class="mw-redirect" title="+55">+55</a></td>
<td>xx 6</td>
<td rowspan="4">11</td>
<td></td>
<td rowspan="4">Mobile phones use geographic area codes (two digits): after that, all numbers assigned to mobile service have nine digits, starting with <i>6</i>, <i>7</i>, <i>8</i> or <i>9</i> (example: +55 15 99999-9999). 90 is not possible, because <a href="/wiki/Collect_call" title="Collect call">collect calls</a> start with this number.<sup id="cite_ref-6" class="reference"><a href="#cite_note-6">[4]</a></sup>
</td></tr>
<tr>
<td>xx 7</td>
<td>
</td></tr>
<tr>
<td>xx 8</td>
<td>
</td></tr>
<tr>
<td>xx 9</td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="British_Indian_Ocean_Territory"></span><a href="/wiki/British_Indian_Ocean_Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</a></td>
<td><a href="/wiki/%2B246" class="mw-redirect" title="+246">+246</a></td>
<td>387</td>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/British_Virgin_Islands" title="British Virgin Islands">British Virgin Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_284" title="Area code 284">284</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Brunei" title="Brunei">Brunei</a></td>
<td><a href="/wiki/%2B673" class="mw-redirect" title="+673">+673</a></td>
<td>8x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Bulgaria" title="Bulgaria">Bulgaria</a></td>
<td rowspan="5"><a href="/wiki/%2B359" class="mw-redirect" title="+359">+359</a></td>
<td>48</td>
<td>?</td>
<td><a href="/wiki/Mobikom" title="Mobikom">Mobikom</a> (now defunct)</td>
<td>
</td></tr>
<tr>
<td>87</td>
<td rowspan="4">9</td>
<td><a href="/wiki/Vivacom" title="Vivacom">Vivacom</a></td>
<td>+359 87 xxxxxxx Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td>88</td>
<td><a href="/wiki/A1_Bulgaria" title="A1 Bulgaria">A1 Bulgaria</a></td>
<td>+359 88 xxxxxxx Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td>89</td>
<td><a href="/wiki/Telenor_(Bulgaria)" title="Telenor (Bulgaria)">Telenor (Bulgaria)</a></td>
<td>+359 89 xxxxxxx Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td>988</td>
<td>Other mobile networks</td>
<td>+359 988 xxxxxx Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Burkina_Faso" title="Burkina Faso">Burkina Faso</a></td>
<td rowspan="8"><a href="/wiki/%2B226" class="mw-redirect" title="+226">+226</a></td>
<td>70</td>
<td rowspan="8">8</td>
<td rowspan="3">Telmob</td>
<td>
</td></tr>
<tr>
<td>71</td>
<td>
</td></tr>
<tr>
<td>72</td>
<td>
</td></tr>
<tr>
<td>74</td>
<td rowspan="3">Celtel</td>
<td>
</td></tr>
<tr>
<td>75</td>
<td>
</td></tr>
<tr>
<td>77</td>
<td>
</td></tr>
<tr>
<td>78</td>
<td rowspan="2">Telecel</td>
<td>
</td></tr>
<tr>
<td>79</td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Burma"></span><a href="/wiki/Burma" class="mw-redirect" title="Burma">Burma</a></td>
<td><a href="/wiki/%2B95" class="mw-redirect" title="+95">+95</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#Myanmar">Myanmar</a>
</td></tr>
<tr>
<td><a href="/wiki/Burundi" title="Burundi">Burundi</a></td>
<td><a href="/wiki/%2B257" class="mw-redirect" title="+257">+257</a></td>
<td>7x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="17"><a href="/wiki/Cambodia" title="Cambodia">Cambodia</a></td>
<td rowspan="17"><a href="/wiki/%2B855" class="mw-redirect" title="+855">+855</a></td>
<td>92</td>
<td rowspan="6">9<br></td>
<td rowspan="6">Cellcard</td>
<td>
</td></tr>
<tr>
<td>12
</td>
<td>
</td></tr>
<tr>
<td>11
</td>
<td>
</td></tr>
<tr>
<td>76
</td>
<td>
</td></tr>
<tr>
<td>77
</td>
<td>
</td></tr>
<tr>
<td>99
</td>
<td>
</td></tr>
<tr>
<td>10
</td>
<td rowspan="11">9
</td>
<td rowspan="11">Smart
</td>
<td>
</td></tr>
<tr>
<td>15
</td>
<td>
</td></tr>
<tr>
<td>16
</td>
<td>
</td></tr>
<tr>
<td>69
</td>
<td>
</td></tr>
<tr>
<td>70
</td>
<td>
</td></tr>
<tr>
<td>81
</td>
<td>
</td></tr>
<tr>
<td>86
</td>
<td>
</td></tr>
<tr>
<td>87
</td>
<td>
</td></tr>
<tr>
<td>93
</td>
<td>
</td></tr>
<tr>
<td>96
</td>
<td>
</td></tr>
<tr>
<td>98
</td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Cameroon" title="Cameroon">Cameroon</a></td>
<td rowspan="2"><a href="/wiki/%2B237" class="mw-redirect" title="+237">+237</a></td>
<td>7</td>
<td rowspan="2">9</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td>Orange</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Canada" title="Canada">Canada</a></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">+1</a></td>
<td>No clear distinction between land and cell numbers.<br>
<p>Area code structure: <br>N-X-Y<br>
N is not 0 or 1<br>
X is not 9<br>
X ≠ Y
</p>
</td>
<td>10</td>
<td></td>
<td>Mobile phones use geographic area codes. Many exchange codes contain primarily mobile devices; local numbers are portable between wired and wireless carriers. While <a href="/wiki/Area_code_600" title="Area code 600">area code 600</a> has been established as a non-geographic code that can be used by mobile phones, the only significant mobile usage has been for <a href="/wiki/Satellite_phone" title="Satellite phone">satellite phone</a> service in remote regions.
</td></tr>
<tr>
<td><a href="/wiki/Canary_Islands" title="Canary Islands">Canary Islands</a></td>
<td>+34</td>
<td><a href="/wiki/Telephone_numbers_in_the_Canary_Islands" title="Telephone numbers in the Canary Islands">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Spain">Spain</a>
</td></tr>
<tr>
<td><a href="/wiki/Cape_Verde" title="Cape Verde">Cape Verde</a></td>
<td><a href="/wiki/%2B238" class="mw-redirect" title="+238">+238</a></td>
<td>9</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Cayman_Islands" title="Cayman Islands">Cayman Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_345" title="Area code 345">345</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Central_African_Republic" title="Central African Republic">Central African Republic</a></td>
<td><a href="/wiki/%2B236" class="mw-redirect" title="+236">+236</a></td>
<td>??</td>
<td>?</td>
<td>Telecel</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Ceuta" title="Ceuta">Ceuta</a></td>
<td>+34</td>
<td><a href="/wiki/Telephone_numbers_in_Ceuta" title="Telephone numbers in Ceuta">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Spain">Spain</a>
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Chad" title="Chad">Chad</a></td>
<td rowspan="8"><a href="/wiki/%2B235" class="mw-redirect" title="+235">+235</a></td>
<td>66</td>
<td rowspan="8">8</td>
<td rowspan="3"><a href="/wiki/Airtel" class="mw-redirect" title="Airtel">Airtel</a></td>
<td>
</td></tr>
<tr>
<td>63</td>
<td>
</td></tr>
<tr>
<td>65</td>
<td>
</td></tr>
<tr>
<td>99</td>
<td rowspan="4"><a href="/wiki/Tigo" class="mw-redirect" title="Tigo">Tigo</a></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td>
</td></tr>
<tr>
<td>93</td>
<td>
</td></tr>
<tr>
<td>90</td>
<td>
</td></tr>
<tr>
<td>77</td>
<td><a href="/wiki/Salamat_Region" class="mw-redirect" title="Salamat Region">Salamat</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Chagos_Islands" class="mw-redirect" title="Chagos Islands">Chagos Islands</a></td>
<td>+246</td>
<td>387</td>
<td>7</td>
<td></td>
<td>See <a href="#British_Indian_Ocean_Territory">British Indian Ocean Territory</a>
</td></tr>
<tr>
<td><span class="anchor" id="Chile"></span><a href="/wiki/Chile" title="Chile">Chile</a></td>
<td><a href="/wiki/%2B56" class="mw-redirect" title="+56">+56</a></td>
<td>9</td>
<td>9</td>
<td>All carriers: <a href="/wiki/Movistar" title="Movistar">Movistar</a>, <a href="/wiki/Claro_(company)" title="Claro (company)">Claro</a>, <a href="/wiki/Entel_(Chile)" title="Entel (Chile)">Entel</a>, WOM, <a href="/wiki/Virgin_Mobile_Chile" title="Virgin Mobile Chile">Virgin Mobile</a>, etc.</td>
<td>Example: +56 9 1234 5678 dialed from Chilean or foreign mobile phones, with or without blank spaces.
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/China" title="China">People's Republic of China</a></td>
<td rowspan="8"><a href="/wiki/%2B86" class="mw-redirect" title="+86">+86</a></td>
<td>13x</td>
<td>11</td>
<td><a href="/wiki/China_Unicom" title="China Unicom">China Unicom</a>: 130-132
<p><a href="/wiki/China_Telecom" title="China Telecom">China Telecom</a>: 133, 1349
</p><p><a href="/wiki/China_Mobile" title="China Mobile">China Mobile</a>: 134-139 (except 1349)
</p>
</td>
<td>1349 for satellite phones.
</td></tr>
<tr>
<td>140-146,148
</td>
<td>13
</td>
<td>China Unicom: 1400, 146
<p>China Telecom: 1410
</p><p>China Mobile: 1440, 148
</p>
</td>
<td>For IoT, cannot be called.
<p>142, 143: not released. (Updated Feb. 10, 2020)
</p>
</td></tr>
<tr>
<td>145, 147, 149
</td>
<td rowspan="6">11</td>
<td>China Unicom: 145
<p>China Telecom: 149
</p><p>China Mobile: 147
</p>
</td>
<td>
</td></tr>
<tr>
<td>15x
</td>
<td>China Unicom: 155-156
<p>China Telecom: 153
</p><p>China Mobile: 150–152, 157-159
</p>
</td>
<td>154 not released (Updated Feb. 10, 2020)
</td></tr>
<tr>
<td>161-162, 164-167
</td>
<td>China Unicom: 166-167
<p>China Telecom: 162
</p><p>China Mobile: 165
</p>
</td>
<td>162, 165, 167 for MVNOs.
</td></tr>
<tr>
<td>17x (except 179)
</td>
<td>China Unicom: 1704, 1707–1709, 171, 175, 176
<p>China Telecom: 1700–1702, 173, 17400–17405, 177
</p><p>China Mobile: 172, 178
</p>
</td>
<td>170, 171 for MVNOs.
<p>174 for satellite phones.
</p><p>179XX for VoIP prefixes, added before the number to call. (e.g. 17951-139-0000-0000)
</p>
</td></tr>
<tr>
<td>18x
</td>
<td>China Unicom: 185-186
<p>China Telecom: 180–181, 189
</p><p>China Mobile: 182–184, 187, 188
</p>
</td>
<td>
</td></tr>
<tr>
<td>19x</td>
<td>China Unicom: 196
<p>China Telecom: 190, 191, 193, 199
</p><p>China Mobile: 195, 197, 198
</p><p>China Broadcast Network: 192
</p>
</td>
<td>194 not released (Updated Feb. 10, 2020)
</td></tr>
<tr>
<td><a href="/wiki/Christmas_Island" title="Christmas Island">Christmas Island</a></td>
<td>+61</td>
<td><a href="/wiki/Telephone_numbers_in_Christmas_Island" title="Telephone numbers in Christmas Island">8 9164</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Australia">Australia</a>
</td></tr>
<tr>
<td><a href="/wiki/Cocos_(Keeling)_Islands" title="Cocos (Keeling) Islands">Cocos (Keeling) Islands</a></td>
<td>+61</td>
<td><a href="/wiki/Telephone_numbers_in_the_Cocos_(Keeling)_Islands" title="Telephone numbers in the Cocos (Keeling) Islands">8 9162</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Australia">Australia</a>
</td></tr>
<tr>
<td rowspan="13"><a href="/wiki/Colombia" title="Colombia">Colombia</a></td>
<td rowspan="13"><a href="/wiki/%2B57" class="mw-redirect" title="+57">+57</a></td>
<td>30x</td>
<td rowspan="13">10</td>
<td><a href="/wiki/Colombia_M%C3%B3vil" title="Colombia Móvil">Tigo</a></td>
<td>
</td></tr>
<tr>
<td>310</td>
<td rowspan="5"><a href="/wiki/Claro_Colombia" title="Claro Colombia">Claro</a></td>
<td>
</td></tr>
<tr>
<td>311</td>
<td>
</td></tr>
<tr>
<td>312</td>
<td>
</td></tr>
<tr>
<td>313</td>
<td>
</td></tr>
<tr>
<td>314</td>
<td>
</td></tr>
<tr>
<td>315</td>
<td rowspan="5"><a href="/wiki/Movistar" title="Movistar">Movistar</a></td>
<td>
</td></tr>
<tr>
<td>316</td>
<td>
</td></tr>
<tr>
<td>317</td>
<td>
</td></tr>
<tr>
<td>318</td>
<td>
</td></tr>
<tr>
<td>319</td>
<td>Operated by <a href="/wiki/Virgin_Mobile" title="Virgin Mobile">Virgin Mobile</a>
</td></tr>
<tr>
<td>32x</td>
<td><a href="/wiki/Claro_Colombia" title="Claro Colombia">Claro</a></td>
<td>
</td></tr>
<tr>
<td>350, 351</td>
<td><a href="/wiki/Avantel" title="Avantel">Avantel</a></td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Comoros"></span><a href="/wiki/Comoros" title="Comoros">Comoros</a></td>
<td><a href="/wiki/%2B269" class="mw-redirect" title="+269">+269</a></td>
<td>3</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Republic_of_Congo" class="mw-redirect" title="Republic of Congo">Republic of Congo</a></td>
<td rowspan="3"><a href="/wiki/%2B242" class="mw-redirect" title="+242">+242</a></td>
<td>4</td>
<td rowspan="3">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="17"><a href="/wiki/Democratic_Republic_of_Congo" class="mw-redirect" title="Democratic Republic of Congo">Democratic Republic of Congo</a></td>
<td rowspan="17"><a href="/wiki/%2B243" class="mw-redirect" title="+243">+243</a></td>
<td>22</td>
<td rowspan="17">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>78</td>
<td></td>
<td>
</td></tr>
<tr>
<td>81</td>
<td>Vodacom</td>
<td>
</td></tr>
<tr>
<td>82</td>
<td>Vodacom</td>
<td>
</td></tr>
<tr>
<td>83</td>
<td></td>
<td>
</td></tr>
<tr>
<td>84</td>
<td>Orange</td>
<td>
</td></tr>
<tr>
<td>85</td>
<td>Orange</td>
<td>
</td></tr>
<tr>
<td>86</td>
<td></td>
<td>
</td></tr>
<tr>
<td>88</td>
<td></td>
<td>
</td></tr>
<tr>
<td>89</td>
<td></td>
<td>
</td></tr>
<tr>
<td>90</td>
<td>Africell</td>
<td>
</td></tr>
<tr>
<td>94</td>
<td></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td></td>
<td>
</td></tr>
<tr>
<td>96</td>
<td></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td></td>
<td>
</td></tr>
<tr>
<td>98</td>
<td></td>
<td>
</td></tr>
<tr>
<td>99</td>
<td>Airtel</td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Cook_Islands" title="Cook Islands">Cook Islands</a></td>
<td rowspan="2"><a href="/wiki/%2B682" class="mw-redirect" title="+682">+682</a></td>
<td>5x</td>
<td rowspan="2">5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7x</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Costa_Rica" title="Costa Rica">Costa Rica</a></td>
<td rowspan="3"><a href="/wiki/%2B506" class="mw-redirect" title="+506">+506</a></td>
<td>6</td>
<td rowspan="3">8</td>
<td>Movistar</td>
<td rowspan="3">Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).
</td></tr>
<tr>
<td>7
</td>
<td>Claro
</td></tr>
<tr>
<td>8</td>
<td>Instituto Costarricense de Electricidad (Kölbi)
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Croatia" title="Croatia">Croatia</a></td>
<td rowspan="6"><a href="/wiki/%2B385" class="mw-redirect" title="+385">+385</a></td>
<td>91</td>
<td rowspan="6">9</td>
<td><a href="/wiki/Vipnet" class="mw-redirect" title="Vipnet">Vipnet</a></td>
<td rowspan="6">Due to <a href="/wiki/Mobile_number_portability" title="Mobile number portability">Mobile number portability</a> the prefix of an existing number does not determine the ntocarri Any new number will follow the numbering plan.
</td></tr>
<tr>
<td>92</td>
<td><a href="/wiki/Tomato_(mobile_phone_operator)" title="Tomato (mobile phone operator)">Tomato</a>
</td></tr>
<tr>
<td>95</td>
<td><a href="/wiki/Tele2" title="Tele2">Tele2</a>
</td></tr>
<tr>
<td>97</td>
<td><a href="/wiki/Bonbon_(mobile_phone_operator)" title="Bonbon (mobile phone operator)">bonbon</a>
</td></tr>
<tr>
<td>98</td>
<td rowspan="2"><a href="/wiki/T-Mobile" title="T-Mobile">T-Mobile</a>
</td></tr>
<tr>
<td>99
</td></tr>
<tr>
<td><a href="/wiki/Cuba" title="Cuba">Cuba</a></td>
<td><a href="/wiki/%2B53" class="mw-redirect" title="+53">+53</a></td>
<td>5</td>
<td>?</td>
<td><a href="/wiki/ETECSA" title="ETECSA">ETECSA</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Cura%C3%A7ao" title="Curaçao">Curaçao</a></td>
<td><a href="/wiki/%2B599" class="mw-redirect" title="+599">+599</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>See <a href="#Curaçao_and_the_Caribbean_Netherlands">Curaçao and the Caribbean Netherlands</a>
</td></tr>
<tr>
<td><span class="anchor" id="Curaçao_and_the_Caribbean_Netherlands"></span><a href="/wiki/Cura%C3%A7ao_and_Dependencies" title="Curaçao and Dependencies">Curaçao and the Caribbean Netherlands</a></td>
<td><a href="/wiki/%2B599" class="mw-redirect" title="+599">+599</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Cyprus" title="Cyprus">Cyprus</a></td>
<td rowspan="5"><a href="/wiki/%2B357" class="mw-redirect" title="+357">+357</a></td>
<td>94</td>
<td rowspan="5">8</td>
<td>LemonTel</td>
<td>a subsidiary of <a href="/w/index.php?title=Cablenet&amp;action=edit&amp;redlink=1" class="new" title="Cablenet (page does not exist)">Cablenet</a>
</td></tr>
<tr>
<td>95</td>
<td>PrimeTel</td>
<td>
</td></tr>
<tr>
<td>96</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>was called Areeba until 2007
</td></tr>
<tr>
<td>97</td>
<td rowspan="2">Cytamobile-Vodafone</td>
<td rowspan="2">a subsidiary of <a href="/wiki/Cyta" class="mw-redirect" title="Cyta">Cyta</a>
</td></tr>
<tr>
<td>99
</td></tr>
<tr>
<td rowspan="13"><a href="/wiki/Czech_Republic" title="Czech Republic">Czech Republic</a></td>
<td rowspan="13"><a href="/wiki/%2B420" class="mw-redirect" title="+420">+420</a></td>
<td>601</td>
<td rowspan="13">9</td>
<td rowspan="2">Telefónica O<sub>2</sub></td>
<td>
</td></tr>
<tr>
<td>602</td>
<td>
</td></tr>
<tr>
<td>603</td>
<td rowspan="3">T-Mobile</td>
<td>
</td></tr>
<tr>
<td>604</td>
<td>
</td></tr>
<tr>
<td>605</td>
<td>
</td></tr>
<tr>
<td>606</td>
<td rowspan="2">Telefónica O<sub>2</sub></td>
<td>
</td></tr>
<tr>
<td>607</td>
<td>
</td></tr>
<tr>
<td>608</td>
<td>Vodafone</td>
<td>
</td></tr>
<tr>
<td>702</td>
<td rowspan="2">Telefónica O<sub>2</sub></td>
<td>
</td></tr>
<tr>
<td>72x</td>
<td>
</td></tr>
<tr>
<td>73x</td>
<td>T-Mobile</td>
<td>Except 730.
</td></tr>
<tr>
<td>77x</td>
<td>Vodafone</td>
<td>
</td></tr>
<tr>
<td>790</td>
<td>U:fon</td>
<td>Except 79023, 79044, 79066, 79088.
</td></tr>
<tr>
<td rowspan="14"><a href="/wiki/Denmark" title="Denmark">Denmark</a></td>
<td rowspan="14"><a href="/wiki/%2B45" class="mw-redirect" title="+45">+45</a></td>
<td>2x</td>
<td rowspan="14">8</td>
<td>TDC</td>
<td>
</td></tr>
<tr>
<td>30</td>
<td></td>
<td>
</td></tr>
<tr>
<td>31</td>
<td></td>
<td>
</td></tr>
<tr>
<td>40</td>
<td></td>
<td>
</td></tr>
<tr>
<td>41</td>
<td></td>
<td>
</td></tr>
<tr>
<td>42</td>
<td></td>
<td>
</td></tr>
<tr>
<td>50</td>
<td>Telenor</td>
<td>
</td></tr>
<tr>
<td>51</td>
<td></td>
<td>
</td></tr>
<tr>
<td>52</td>
<td></td>
<td>
</td></tr>
<tr>
<td>53</td>
<td></td>
<td>
</td></tr>
<tr>
<td>60</td>
<td></td>
<td>
</td></tr>
<tr>
<td>61</td>
<td></td>
<td>
</td></tr>
<tr>
<td>71</td>
<td></td>
<td>
</td></tr>
<tr>
<td>81</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Diego_Garcia" title="Diego Garcia">Diego Garcia</a></td>
<td>+246</td>
<td>387</td>
<td>7</td>
<td></td>
<td>See <a href="#British_Indian_Ocean_Territory">British Indian Ocean Territory</a>
</td></tr>
<tr>
<td><a href="/wiki/Djibouti" title="Djibouti">Djibouti</a></td>
<td><a href="/wiki/%2B253" class="mw-redirect" title="+253">+253</a></td>
<td>8</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Dominica" title="Dominica">Dominica</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_767" title="Area code 767">767</a> 2xx</td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Dominican_Republic" title="Dominican Republic">Dominican Republic</a></td>
<td rowspan="3">+1</td>
<td><a href="/wiki/Area_code_809" class="mw-redirect" title="Area code 809">809</a></td>
<td rowspan="3">10</td>
<td></td>
<td rowspan="3"><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Area_code_829" class="mw-redirect" title="Area code 829">829</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Area_code_849" class="mw-redirect" title="Area code 849">849</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/East_Timor" title="East Timor">East Timor</a></td>
<td rowspan="2"><a href="/wiki/%2B670" class="mw-redirect" title="+670">+670</a></td>
<td>77</td>
<td rowspan="2">8</td>
<td></td>
<td>+670 77xxxxxx
</td></tr>
<tr>
<td>78</td>
<td></td>
<td>+670 78xxxxxx
</td></tr>
<tr>
<td><a href="/wiki/Easter_Island" title="Easter Island">Easter Island</a></td>
<td>+56</td>
<td><a href="/wiki/Telephone_numbers_in_Easter_Island" class="mw-redirect" title="Telephone numbers in Easter Island">32</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Chile">Chile</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Ecuador" title="Ecuador">Ecuador</a></td>
<td rowspan="2"><a href="/wiki/%2B593" class="mw-redirect" title="+593">+593</a></td>
<td>8</td>
<td>?</td>
<td></td>
<td>newest lines
</td></tr>
<tr>
<td>9</td>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Egypt" title="Egypt">Egypt</a></td>
<td rowspan="4"><a href="/wiki/%2B20" class="mw-redirect" title="+20">+20</a></td>
<td>10</td>
<td rowspan="4">10</td>
<td><a href="/wiki/Vodafone" title="Vodafone">Vodafone</a></td>
<td rowspan="4">
<ul><li>Users can now switch carriers and keep their cell phone numbers, including prefix.</li>
<li>An additional digit has been added to the code of every carrier. Making a single code per carrier, after each carrier had to have multiple codes. And making the NSN 10 digits after it was 9.</li>
<li>Dialing format inside Egypt is 01X XXXX XXXX, International format is +20 1X XXXX XXXX</li></ul>
</td></tr>
<tr>
<td>11</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a>
</td></tr>
<tr>
<td>12</td>
<td><a href="/wiki/Orange_Egypt" title="Orange Egypt">Orange Egypt</a>
</td></tr>
<tr>
<td>15</td>
<td><a href="/w/index.php?title=WE_Egypt&amp;action=edit&amp;redlink=1" class="new" title="WE Egypt (page does not exist)">WE Egypt</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/El_Salvador" title="El Salvador">El Salvador</a></td>
<td rowspan="2"><a href="/wiki/%2B503" class="mw-redirect" title="+503">+503</a></td>
<td>6</td>
<td rowspan="2">8</td>
<td></td>
<td rowspan="2">
<ul><li>Users can now switch carriers and keep their cell phone numbers, including prefix.</li></ul>
</td></tr>
<tr>
<td>7</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/England" title="England">England</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Equatorial_Guinea" title="Equatorial Guinea">Equatorial Guinea</a></td>
<td rowspan="2"><a href="/wiki/%2B240" class="mw-redirect" title="+240">+240</a></td>
<td>2</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Eritrea" title="Eritrea">Eritrea</a></td>
<td><a href="/wiki/%2B291" class="mw-redirect" title="+291">+291</a></td>
<td>7</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Estonia" title="Estonia">Estonia</a></td>
<td><a href="/wiki/%2B372" class="mw-redirect" title="+372">+372</a></td>
<td>5x</td>
<td>?</td>
<td></td>
<td>
<ul><li>Users can switch carriers and keep their cell phone numbers, including prefix.</li></ul>
</td></tr>
<tr>
<td><a href="/wiki/Ethiopia" title="Ethiopia">Ethiopia</a></td>
<td><a href="/wiki/%2B251" class="mw-redirect" title="+251">+251</a></td>
<td>9X</td>
<td>?</td>
<td><a href="/wiki/Ethio_telecom" title="Ethio telecom">Ethio telecom</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Eswatini" title="Eswatini">Eswatini</a></td>
<td><a href="/wiki/%2B268" class="mw-redirect" title="+268">+268</a></td>
<td>7</td>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Falkland_Islands"></span><a href="/wiki/Falkland_Islands" title="Falkland Islands">Falkland Islands</a></td>
<td rowspan="2"><a href="/wiki/%2B500" class="mw-redirect" title="+500">+500</a></td>
<td>5</td>
<td rowspan="2">5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="28"><a href="/wiki/Faroe_Islands" title="Faroe Islands">Faroe Islands</a></td>
<td rowspan="28"><a href="/wiki/%2B298" class="mw-redirect" title="+298">+298</a></td>
<td>21</td>
<td rowspan="28">5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>22</td>
<td></td>
<td>
</td></tr>
<tr>
<td>23</td>
<td></td>
<td>
</td></tr>
<tr>
<td>24</td>
<td></td>
<td>
</td></tr>
<tr>
<td>25</td>
<td></td>
<td>
</td></tr>
<tr>
<td>26</td>
<td></td>
<td>
</td></tr>
<tr>
<td>27</td>
<td></td>
<td>
</td></tr>
<tr>
<td>28</td>
<td></td>
<td>
</td></tr>
<tr>
<td>29</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5x</td>
<td></td>
<td>
</td></tr>
<tr>
<td>71</td>
<td></td>
<td>
</td></tr>
<tr>
<td>72</td>
<td></td>
<td>
</td></tr>
<tr>
<td>73</td>
<td></td>
<td>
</td></tr>
<tr>
<td>74</td>
<td></td>
<td>
</td></tr>
<tr>
<td>75</td>
<td></td>
<td>
</td></tr>
<tr>
<td>76</td>
<td></td>
<td>
</td></tr>
<tr>
<td>77</td>
<td></td>
<td>
</td></tr>
<tr>
<td>78</td>
<td></td>
<td>
</td></tr>
<tr>
<td>79</td>
<td></td>
<td>
</td></tr>
<tr>
<td>91</td>
<td></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td></td>
<td>
</td></tr>
<tr>
<td>94</td>
<td></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td></td>
<td>
</td></tr>
<tr>
<td>96</td>
<td></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td></td>
<td>
</td></tr>
<tr>
<td>98</td>
<td></td>
<td>
</td></tr>
<tr>
<td>99</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Federated_States_of_Micronesia" title="Federated States of Micronesia">Federated States of Micronesia</a></td>
<td rowspan="4"><a href="/wiki/%2B691" class="mw-redirect" title="+691">+691</a></td>
<td>92</td>
<td rowspan="4">7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Fiji" title="Fiji">Fiji</a></td>
<td rowspan="3"><a href="/wiki/%2B679" class="mw-redirect" title="+679">+679</a></td>
<td>3</td>
<td rowspan="3">?</td>
<td>Telecom</td>
<td>
</td></tr>
<tr>
<td>7</td>
<td>Digicel</td>
<td>
</td></tr>
<tr>
<td>9</td>
<td>Vodafone</td>
<td>
</td></tr>
<tr>
<td rowspan="4"><span class="anchor" id="Finland"></span><a href="/wiki/Finland" title="Finland">Finland</a></td>
<td rowspan="4"><a href="/wiki/%2B358" class="mw-redirect" title="+358">+358</a></td>
<td>4x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>457</td>
<td>10</td>
<td></td>
<td>
</td></tr>
<tr>
<td>50</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>500</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/France" title="France">France</a></td>
<td rowspan="8"><a href="/wiki/%2B33" class="mw-redirect" title="+33">+33</a></td>
<td>6</td>
<td rowspan="8">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>700</td>
<td></td>
<td>
</td></tr>
<tr>
<td>73</td>
<td></td>
<td>
</td></tr>
<tr>
<td>74</td>
<td></td>
<td>
</td></tr>
<tr>
<td>75</td>
<td></td>
<td>
</td></tr>
<tr>
<td>76</td>
<td></td>
<td>
</td></tr>
<tr>
<td>77</td>
<td></td>
<td>
</td></tr>
<tr>
<td>78</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Overseas_department" class="mw-redirect" title="Overseas department">French Overseas Departments and Territories</a></td>
<td><a href="/wiki/%2B262" class="mw-redirect" title="+262">+262</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#Réunion">Réunion</a> and Mayotte
</td></tr>
<tr>
<td><a href="/wiki/%2B508" class="mw-redirect" title="+508">+508</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#Saint_Pierre_and_Miquelon">Saint Pierre and Miquelon</a>
</td></tr>
<tr>
<td><a href="/wiki/%2B590" class="mw-redirect" title="+590">+590</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#Guadeloupe">Guadeloupe</a>, Saint-Barthélemy and Saint-Martin
</td></tr>
<tr>
<td><a href="/wiki/%2B594" class="mw-redirect" title="+594">+594</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#French_Guiana">French Guiana</a>
</td></tr>
<tr>
<td><a href="/wiki/%2B596" class="mw-redirect" title="+596">+596</a></td>
<td></td>
<td></td>
<td></td>
<td>See <a href="#Martinique">Martinique</a>
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="French_Guiana"></span><a href="/wiki/French_Guiana" title="French Guiana">French Guiana</a></td>
<td rowspan="2"><a href="/wiki/%2B594" class="mw-redirect" title="+594">+594</a></td>
<td>694</td>
<td>9</td>
<td></td>
<td>+594 694 xx xx xx
</td></tr>
<tr>
<td>700</td>
<td>12?</td>
<td></td>
<td>(NSN = 12 means +594 700 xxx xxx xxx)
</td></tr>
<tr>
<td><a href="/wiki/French_Polynesia" title="French Polynesia">French Polynesia</a></td>
<td><a href="/wiki/%2B689" class="mw-redirect" title="+689">+689</a></td>
<td>87: Vini<br>89: PMT</td>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Gabon" title="Gabon">Gabon</a></td>
<td rowspan="6"><a href="/wiki/%2B241" class="mw-redirect" title="+241">+241</a></td>
<td>2</td>
<td rowspan="6">7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>3</td>
<td></td>
<td>
</td></tr>
<tr>
<td>4</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Gambia" class="mw-redirect" title="Gambia">Gambia</a></td>
<td rowspan="2"><a href="/wiki/%2B220" class="mw-redirect" title="+220">+220</a></td>
<td>7x</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>9x</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="21"><span class="anchor" id="Georgia"></span><a href="/wiki/Georgia_(country)" title="Georgia (country)">Georgia</a></td>
<td rowspan="21"><a href="/wiki/%2B995" class="mw-redirect" title="+995">+995</a></td>
<td>544</td>
<td rowspan="21">9</td>
<td><a href="/wiki/Aquafon" title="Aquafon">Aquafon</a></td>
<td>Operating in <a href="#Abkhazia">Abkhazia</a>, also having +7-940 code
</td></tr>
<tr>
<td>514</td>
<td><a href="/wiki/Silknet" title="Silknet">Silknet</a> <i><a href="/wiki/Geocell" title="Geocell"><sub>Geocell</sub></a></i></td>
<td><b>Attention!</b> Numbering plan will be changed in 2011. Update will be made afterwards. Be advised that on February 15, 2011 number portability has been introduced, so prefixes can be of other networks.
</td></tr>
<tr>
<td>551</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a> <sub><i>Bani</i></sub>
</td>
<td>
</td></tr>
<tr>
<td>555</td>
<td rowspan="3"><a href="/wiki/Silknet" title="Silknet">Silknet</a> <i><a href="/wiki/Geocell" title="Geocell"><sub>Geocell</sub></a></i>
</td>
<td>
</td></tr>
<tr>
<td>557
</td>
<td>
</td></tr>
<tr>
<td>558
</td>
<td>
</td></tr>
<tr>
<td>568
</td>
<td><a href="/wiki/Vimpelcom" class="mw-redirect" title="Vimpelcom">BeeLine</a>
</td>
<td>
</td></tr>
<tr>
<td>570
</td>
<td><a href="/wiki/Silknet" title="Silknet">Silknet</a> <a href="/wiki/Geocell" title="Geocell"><sub><i>S1</i></sub></a>
</td>
<td>
</td></tr>
<tr>
<td>571
</td>
<td rowspan="2"><a href="/wiki/Vimpelcom" class="mw-redirect" title="Vimpelcom">BeeLine</a>
</td>
<td>
</td></tr>
<tr>
<td>574
</td>
<td>
</td></tr>
<tr>
<td>577</td>
<td><a href="/wiki/Silknet" title="Silknet">Silknet</a> <i><a href="/wiki/Geocell" title="Geocell"><sub>Geocell</sub></a></i>
</td>
<td>
</td></tr>
<tr>
<td>578
</td>
<td><a href="/wiki/Silknet" title="Silknet">Silknet</a> <a href="/wiki/Geocell" title="Geocell"><sub><i>S1</i></sub></a>
</td>
<td>
</td></tr>
<tr>
<td>579</td>
<td><a href="/wiki/Vimpelcom" class="mw-redirect" title="Vimpelcom">BeeLine</a>
</td>
<td>
</td></tr>
<tr>
<td>591</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a>
</td>
<td>
</td></tr>
<tr>
<td>592</td>
<td><a href="/wiki/Vimpelcom" class="mw-redirect" title="Vimpelcom">BeeLine</a>
</td>
<td>
</td></tr>
<tr>
<td>593</td>
<td><a href="/wiki/Silknet" title="Silknet">Silknet</a> <i><a href="/wiki/Geocell" title="Geocell"><sub>Geocell</sub></a></i>
</td>
<td>
</td></tr>
<tr>
<td>595</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a>
</td>
<td>
</td></tr>
<tr>
<td>596</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a> <sub><i>Bali</i></sub>
</td>
<td>
</td></tr>
<tr>
<td>597</td>
<td><a href="/wiki/Vimpelcom" class="mw-redirect" title="Vimpelcom">BeeLine</a>
</td>
<td>
</td></tr>
<tr>
<td>598</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a> <sub><i>Bali</i></sub>
</td>
<td>
</td></tr>
<tr>
<td>599</td>
<td><a href="/wiki/MagtiCom" title="MagtiCom">MagtiCom</a>
</td>
<td>
</td></tr>
<tr>
<td rowspan="18"><a href="/wiki/Germany" title="Germany">Germany</a></td>
<td rowspan="18"><a href="/wiki/%2B49" class="mw-redirect" title="+49">+49</a></td>
<td>151x</td>
<td rowspan="5">10</td>
<td>T-Mobile (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>152x</td>
<td>Vodafone D2 (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>155x</td>
<td rowspan="2">E-Plus (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>157x</td>
<td style="text-align:right;">157-0 used for MVNO ViStream,<br>157-5 for Ring Mobilfunk
</td></tr>
<tr>
<td>159x</td>
<td>O<sub>2</sub> Germany (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>160</td>
<td>10/11</td>
<td>T-Mobile (GSM/UMTS)</td>
<td style="text-align:right;">NSN length is 10 digits except 0160–9 with 11 digits
</td></tr>
<tr>
<td>162</td>
<td rowspan="8">10</td>
<td>Vodafone D2 (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>163</td>
<td>E-Plus (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>170</td>
<td rowspan="2">T-Mobile (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>171</td>
<td>
</td></tr>
<tr>
<td>172</td>
<td rowspan="3">Vodafone D2 (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>173</td>
<td>
</td></tr>
<tr>
<td>174</td>
<td>
</td></tr>
<tr>
<td>175</td>
<td>T-Mobile (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>176
</td>
<td>11</td>
<td>O<sub>2</sub> Germany (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>177
</td>
<td rowspan="3">10</td>
<td rowspan="2">E-Plus (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td>178</td>
<td>
</td></tr>
<tr>
<td>179</td>
<td>O<sub>2</sub> Germany (GSM/UMTS)</td>
<td>
</td></tr>
<tr>
<td rowspan="12"><a href="/wiki/Ghana" title="Ghana">Ghana</a></td>
<td rowspan="12"><a href="/wiki/%2B233" class="mw-redirect" title="+233">+233</a></td>
<td>20</td>
<td rowspan="12">9</td>
<td>Vodafone</td>
<td>
</td></tr>
<tr>
<td>50</td>
<td><a href="/wiki/Vodafone" title="Vodafone">Vodafone</a></td>
<td>
</td></tr>
<tr>
<td>23</td>
<td>Glo Mobile</td>
<td>
</td></tr>
<tr>
<td>24</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>54</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>55</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>59</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>26</td>
<td>Airtel (Zain)</td>
<td>
</td></tr>
<tr>
<td>56</td>
<td>Airtel (Zain)</td>
<td>
</td></tr>
<tr>
<td>27</td>
<td><a href="/wiki/Tigo" class="mw-redirect" title="Tigo">Tigo</a></td>
<td>
</td></tr>
<tr>
<td>57</td>
<td><a href="/wiki/Tigo" class="mw-redirect" title="Tigo">Tigo</a></td>
<td>
</td></tr>
<tr>
<td>28</td>
<td>Kasapa</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Gibraltar" title="Gibraltar">Gibraltar</a></td>
<td><a href="/wiki/%2B350" class="mw-redirect" title="+350">+350</a></td>
<td>58x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Greece" title="Greece">Greece</a></td>
<td rowspan="9"><a href="/wiki/%2B30" class="mw-redirect" title="+30">+30</a></td>
<td>2</td>
<td rowspan="9">10</td>
<td>Landline</td>
<td>
</td></tr>
<tr>
<td>1</td>
<td>Emergency or short number</td>
<td>
</td></tr>
<tr>
<td>690</td>
<td rowspan="2"><a href="/wiki/WIND_Hellas" class="mw-redirect" title="WIND Hellas">WIND</a></td>
<td>
</td></tr>
<tr>
<td>693</td>
<td>
</td></tr>
<tr>
<td>694</td>
<td rowspan="2"><a href="/wiki/Vodafone_Greece" title="Vodafone Greece">Vodafone</a></td>
<td>
</td></tr>
<tr>
<td>695</td>
<td>
</td></tr>
<tr>
<td>697</td>
<td rowspan="2"><a href="/wiki/Cosmote" title="Cosmote">Cosmote</a></td>
<td>
</td></tr>
<tr>
<td>698</td>
<td>
</td></tr>
<tr>
<td>699</td>
<td><a href="/wiki/WIND_Hellas" class="mw-redirect" title="WIND Hellas">WIND</a></td>
<td>The prefix belonged to <a href="/wiki/Q-Telecom" title="Q-Telecom">Q-Telecom</a> until <a href="/wiki/WIND_Hellas" class="mw-redirect" title="WIND Hellas">WIND</a> acquired the company in May 2007.
</td></tr>
<tr>
<td><a href="/wiki/Greenland" title="Greenland">Greenland</a></td>
<td><a href="/wiki/%2B299" class="mw-redirect" title="+299">+299</a></td>
<td>??</td>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Grenada" title="Grenada">Grenada</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_473" title="Area code 473">473</a> 41x</td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Guadeloupe"></span><a href="/wiki/Guadeloupe" title="Guadeloupe">Guadeloupe</a></td>
<td rowspan="2"><a href="/wiki/%2B590" class="mw-redirect" title="+590">+590</a></td>
<td>690
</td>
<td>9?</td>
<td></td>
<td>+590 690 xx xx xx (Guadeloupe, Saint-Barthélemy and Saint-Martin share the same prefix)
</td></tr>
<tr>
<td>700</td>
<td>12?</td>
<td></td>
<td>(NSN = 12 means +590 700 xxx xxx xxx)
</td></tr>
<tr>
<td><a href="/wiki/Guam" title="Guam">Guam</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_671" title="Area code 671">671</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td rowspan="28"><a href="/wiki/Guatemala" title="Guatemala">Guatemala</a></td>
<td rowspan="28"><a href="/wiki/%2B502" class="mw-redirect" title="+502">+502</a></td>
<td>231</td>
<td rowspan="28">8</td>
<td rowspan="26">Comcel Mobile</td>
<td rowspan="26">
</td></tr>
<tr>
<td>2324
</td></tr>
<tr>
<td>2326
</td></tr>
<tr>
<td>2327
</td></tr>
<tr>
<td>2328
</td></tr>
<tr>
<td>2329
</td></tr>
<tr>
<td>2428
</td></tr>
<tr>
<td>2429
</td></tr>
<tr>
<td>30
</td></tr>
<tr>
<td>310
</td></tr>
<tr>
<td>311
</td></tr>
<tr>
<td>3120-3128
</td></tr>
<tr>
<td>4476-4479
</td></tr>
<tr>
<td>448
</td></tr>
<tr>
<td>449
</td></tr>
<tr>
<td>45
</td></tr>
<tr>
<td>46
</td></tr>
<tr>
<td>470-476
</td></tr>
<tr>
<td>4773-4779
</td></tr>
<tr>
<td>478
</td></tr>
<tr>
<td>479
</td></tr>
<tr>
<td>480
</td></tr>
<tr>
<td>481
</td></tr>
<tr>
<td>4822-4829
</td></tr>
<tr>
<td>483-489
</td></tr>
<tr>
<td>49
</td></tr>
<tr>
<td>4x</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5x</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Guernsey" title="Guernsey">Guernsey</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td><a href="/wiki/Guinea" title="Guinea">Guinea</a></td>
<td><a href="/wiki/%2B224" class="mw-redirect" title="+224">+224</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Guinea-Bissau" title="Guinea-Bissau">Guinea-Bissau</a></td>
<td rowspan="2"><a href="/wiki/%2B245" class="mw-redirect" title="+245">+245</a></td>
<td>6</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Guyana" title="Guyana">Guyana</a></td>
<td><a href="/wiki/%2B592" class="mw-redirect" title="+592">+592</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Haiti" title="Haiti">Haiti</a><sup id="cite_ref-itu592_7-0" class="reference"><a href="#cite_note-itu592-7">[5]</a></sup></td>
<td rowspan="7"><a href="/wiki/%2B509" class="mw-redirect" title="+509">+509</a></td>
<td>34</td>
<td rowspan="7">?</td>
<td rowspan="2">Comcel (Voilà)</td>
<td>
</td></tr>
<tr>
<td>39</td>
<td>
</td></tr>
<tr>
<td>35</td>
<td>Haïtel</td>
<td>
</td></tr>
<tr>
<td>36</td>
<td rowspan="3">Digicel</td>
<td>
</td></tr>
<tr>
<td>37</td>
<td>
</td></tr>
<tr>
<td>38</td>
<td>
</td></tr>
<tr>
<td>4x</td>
<td>Any carrier</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Hawaii" title="Hawaii">Hawaii</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_808" title="Area code 808">808</a></td>
<td>10</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Honduras" title="Honduras">Honduras</a></td>
<td rowspan="4"><a href="/wiki/%2B504" class="mw-redirect" title="+504">+504</a></td>
<td>3</td>
<td rowspan="4">8</td>
<td>Claro</td>
<td>
</td></tr>
<tr>
<td>7</td>
<td>Hondutel</td>
<td>
</td></tr>
<tr>
<td>8</td>
<td>Digicel</td>
<td>
</td></tr>
<tr>
<td>9</td>
<td>Tigo</td>
<td>
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Hong_Kong" title="Hong Kong">Hong Kong</a></td>
<td rowspan="8"><a href="/wiki/%2B852" class="mw-redirect" title="+852">+852</a></td>
<td>460-469</td>
<td rowspan="8">8</td>
<td rowspan="8">various operators, including  <a href="/wiki/CSL_Mobile" title="CSL Mobile">CSL Mobile</a>, <a href="/wiki/Sun_Mobile" title="Sun Mobile">Sun Mobile</a>, <a href="/wiki/3_Hong_Kong" title="3 Hong Kong">3 HK</a>, <a href="/wiki/PCCW_Mobile" title="PCCW Mobile">PCCW Mobile</a>, <a href="/wiki/SmarTone" title="SmarTone">SmarTone</a>, <a href="/wiki/CMHK" title="CMHK">CMHK</a>, <a href="/wiki/China_Unicom" title="China Unicom">China Unicom</a></td>
<td rowspan="8">Operator can be changed while keeping numbers.
</td></tr>
<tr>
<td>510-579
</td></tr>
<tr>
<td>590-599
</td></tr>
<tr>
<td>601-699
</td></tr>
<tr>
<td>701-709
</td></tr>
<tr>
<td>840-849
</td></tr>
<tr>
<td>901-910
</td></tr>
<tr>
<td>912-989
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Hungary" title="Hungary">Hungary</a></td>
<td rowspan="7"><a href="/wiki/%2B36" class="mw-redirect" title="+36">+36</a></td>
<td>20</td>
<td rowspan="7">9</td>
<td><a rel="nofollow" class="external text" href="https://www.telenor.hu/">Telenor HU</a> <i>(formerly "Pannon", and "Pannon GSM")</i></td>
<td>After April 1, 2004, the phone numbers can be carried from network to network. That means any of the previous codes can refer to any mobile provider. There's internal roaming between Telenor and Telekom. Mobile numbers are 7 digits long, and look like this: +36 XX 123 4567.
<p>DIGI Move (Virtual) also uses Telenor's network with the same prefix. (They will probably merge with DIGI.MOBILE HU after a while)
</p>
</td></tr>
<tr>
<td>30</td>
<td><a rel="nofollow" class="external text" href="https://www.telekom.hu/">Telekom HU</a> <i>(formerly "T-Mobile", "<a href="https://hu.wikipedia.org/wiki/Westel_900" class="extiw" title="hu:Westel 900">Westel 900</a>")</i></td>
<td>Telekom HU and Telenor HU are sharing each other's network so they can complement each other with nation-wide coverage.
<p><a rel="nofollow" class="external text" href="http://bluemobile.hu/">Blue Mobile</a> (BR, owned by <a href="/wiki/Lidl" title="Lidl">Lidl</a>) also uses Telekom's network with the same prefix.
</p><p><a rel="nofollow" class="external text" href="http://www.molmobile.hu">MOL Mobile</a> (BR, owned by <a href="/wiki/MOL_(company)" title="MOL (company)">MOL Nyrt</a>.) also uses Telekom's network with the same prefix.
</p>
</td></tr>
<tr>
<td>31</td>
<td><a rel="nofollow" class="external text" href="https://www.upc.hu/mobil/">UPC Mobil</a> (MVNO), hosted by Vodafone HU.
<p><i>(formerly Tesco Mobile which was also hosted by Vodafone HU until 2016.04.16.)</i>
</p>
</td>
<td>
</td></tr>
<tr>
<td>38</td>
<td>GSM-R network for MÁV &amp; GySEV (Railroad providers)</td>
<td>
</td></tr>
<tr>
<td>50</td>
<td>DIGI.MOBILE HU</td>
<td>It is the 4th mobile carrier in Hungary and the 2nd provider which provides both mobile and wired solutions in national level.
<p><i>(DIGI.MOBILE HU was established: 2019.05.27.)</i>
</p><p>They provide only 2G and 4G because they can only use a relatively tiny amount of frequency bands (1800&nbsp;MHz only) so the maximum reachable speed is 40Mbit/s in theory. Today (2019.06.12.) their coverage is about to 20-25% (being present mostly at bigger cities and along railroads and motorways) but the network is sill under construction.
</p><p><i>(Previously it was going to be the "MPVI Mobil" but it has never been established. Its plan was withdrawn.)</i>
</p>
</td></tr>
<tr>
<td>60</td>
<td>reserved/retired</td>
<td>Formerly <a href="https://hu.wikipedia.org/wiki/Westel_900" class="extiw" title="hu:Westel 900">Westel 0660</a> (which used the 450&nbsp;MHz NMT standard) until 2003.06.30. It was the first and the last "mobile" provider which used only 6 digits back in the day. Afterwards the customers have been transferred to <a href="https://hu.wikipedia.org/wiki/Westel_900" class="extiw" title="hu:Westel 900">Westel 900</a> (same company). They could keep their number but all of them got a digit "9" to the top of their number. So then they became standard "7 digit number" users. Their number are now look like this: +36 30 9 XXX XXX
</td></tr>
<tr>
<td>70</td>
<td><a rel="nofollow" class="external text" href="https://www.vodafone.hu/">Vodafone HU</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Iceland" title="Iceland">Iceland</a></td>
<td><a href="/wiki/%2B354" class="mw-redirect" title="+354">+354</a></td>
<td>6</td>
<td>?</td>
<td>Three providers are present in Iceland: Siminn, Vodafone and Nova.
</td>
<td>
</td></tr>
<tr>
<td rowspan="13"><a href="/wiki/India" title="India">India</a>
</td>
<td rowspan="13"><a href="/wiki/%2B91" class="mw-redirect" title="+91">+91</a>
</td>
<td>6xx
</td>
<td rowspan="13">10
</td>
<td>Reliance Jio GSM
</td>
<td>
</td></tr>
<tr>
<td>7xx</td>
<td rowspan="2">Various GSM and CDMA, including Aircel GSM, Airtel, BSNL GSM &amp; CDMA, Idea, Loop Mobile GSM, MTS CDMA, Reliance GSM &amp; CDMA, S-Tel GSM, Uninor GSM, Videocon GSM, Vodafone GSM.</td>
<td rowspan="12"><a href="/wiki/Mobile_number_portability" title="Mobile number portability">Mobile number portability</a> implemented since 2011 allows subscribers to change their operators without changing numbers. For more details, see <a href="/wiki/Mobile_telephone_numbering_in_India" title="Mobile telephone numbering in India">Mobile telephone numbering in India</a>
</td></tr>
<tr>
<td>8xx
</td></tr>
<tr>
<td>90x</td>
<td>Various GSM
</td></tr>
<tr>
<td>91x</td>
<td>Various GSM and CDMA, including MTS CDMA, BSNL GSM &amp; CDMA, Uninor GSM, Loop Mobile GSM, S-Tel GSM etc.
</td></tr>
<tr>
<td>92x</td>
<td><a href="/wiki/Tata_Indicom" class="mw-redirect" title="Tata Indicom">Tata Indicom</a> CDMA
</td></tr>
<tr>
<td>93x</td>
<td>Reliance CDMA
</td></tr>
<tr>
<td>94x</td>
<td>BSNL GSM
</td></tr>
<tr>
<td>95x</td>
<td>Various GSM, including Airtel, BSNL, Idea, Aircel, Reliance GSM and Vodafone.
</td></tr>
<tr>
<td>96x</td>
<td>Various GSM and CDMA, including Airtel, Idea, Reliance CDMA &amp; GSM, Vodafone and Aircel.
</td></tr>
<tr>
<td>97x</td>
<td rowspan="3">Various GSM, including Airtel, Vodafone, Idea, Aircel, Uninor, Reliance GSM and Videocon.
</td></tr>
<tr>
<td>98x
</td></tr>
<tr>
<td>99x
</td></tr>
<tr>
<td rowspan="21"><a href="/wiki/Indonesia" title="Indonesia">Indonesia</a></td>
<td rowspan="21"><a href="/wiki/%2B62" class="mw-redirect" title="+62">+62</a></td>
<td>811</td>
<td>9</td>
<td><a href="/wiki/Telkomsel" title="Telkomsel">Telkomsel</a> (KartuHalo)</td>
<td>6 digits
</td></tr>
<tr>
<td>812</td>
<td>10-11</td>
<td><a href="/wiki/Telkomsel" title="Telkomsel">Telkomsel</a> (KartuHalo &amp; simPati)</td>
<td>7-8 digits
</td></tr>
<tr>
<td>813</td>
<td rowspan="2">11</td>
<td><a href="/wiki/Telkomsel" title="Telkomsel">Telkomsel</a> (KartuHalo &amp; simPati)</td>
<td>8 digits
</td></tr>
<tr>
<td>814</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (IM2 Broadband Internet &amp; Matrix)</td>
<td>8 digits
</td></tr>
<tr>
<td>815</td>
<td>10</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (Mentari &amp; Matrix)</td>
<td>7 digits
</td></tr>
<tr>
<td>816</td>
<td rowspan="2">9-10</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (Mentari)</td>
<td>6-7 digits
</td></tr>
<tr>
<td>817</td>
<td rowspan="3"><a href="/wiki/XL_Axiata" title="XL Axiata">XL</a></td>
<td>6-7 digits
</td></tr>
<tr>
<td>818</td>
<td>9</td>
<td>6 digits
</td></tr>
<tr>
<td>819</td>
<td rowspan="2">10</td>
<td>7 digits
</td></tr>
<tr>
<td>838</td>
<td><a href="/wiki/AXIS_Telekom_Indonesia" class="mw-redirect" title="AXIS Telekom Indonesia">AXIS</a></td>
<td>7 digits
</td></tr>
<tr>
<td>852</td>
<td rowspan="2">11</td>
<td rowspan="2"><a href="/wiki/Telkomsel" title="Telkomsel">Telkomsel</a> (Kartu As)</td>
<td>8 digits
</td></tr>
<tr>
<td>853</td>
<td>8 digits
</td></tr>
<tr>
<td>855</td>
<td>10</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (im3 Postpaid)</td>
<td>7 digits
</td></tr>
<tr>
<td>856</td>
<td>10-11</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (im3 Prepaid)</td>
<td>7-8 digits
</td></tr>
<tr>
<td>858</td>
<td rowspan="3">11</td>
<td><a href="/wiki/Indosat" title="Indosat">Indosat</a> (Mentari)</td>
<td>8 digits
</td></tr>
<tr>
<td>859</td>
<td rowspan="2"><a href="/wiki/XL_Axiata" title="XL Axiata">XL</a></td>
<td>8 digits
</td></tr>
<tr>
<td>878</td>
<td>8 digits
</td></tr>
<tr>
<td>896</td>
<td rowspan="4">10</td>
<td rowspan="4"><a href="/wiki/Hutchison_3G" class="mw-redirect" title="Hutchison 3G">3</a></td>
<td>7 digits
</td></tr>
<tr>
<td>897</td>
<td>7 digits
</td></tr>
<tr>
<td>898</td>
<td>7 digits
</td></tr>
<tr>
<td>899</td>
<td>7 digits
</td></tr>
<tr>
<td rowspan="19"><a href="/wiki/Iran" title="Iran">Iran</a></td>
<td rowspan="19"><a href="/wiki/%2B98" class="mw-redirect" title="+98">+98</a></td>
<td>901</td>
<td rowspan="3">?</td>
<td rowspan="3"><a href="/wiki/MTN_Irancell" title="MTN Irancell">MTN Irancell</a></td>
<td>
</td></tr>
<tr>
<td>902</td>
<td>
</td></tr>
<tr>
<td>903</td>
<td>
</td></tr>
<tr>
<td>91x</td>
<td>10</td>
<td><a href="/wiki/Hamrah_Aval" class="mw-redirect" title="Hamrah Aval">Hamrah Aval</a></td>
<td>
</td></tr>
<tr>
<td>920</td>
<td rowspan="13">?</td>
<td rowspan="3"><a href="/wiki/RighTel" class="mw-redirect" title="RighTel">RighTel</a></td>
<td>
</td></tr>
<tr>
<td>921</td>
<td>
</td></tr>
<tr>
<td>922</td>
<td>
</td></tr>
<tr>
<td>930</td>
<td><a href="/wiki/MTN_Irancell" title="MTN Irancell">MTN Irancell</a></td>
<td>
</td></tr>
<tr>
<td>931</td>
<td>MTCE</td>
<td>
</td></tr>
<tr>
<td>932</td>
<td><a href="/wiki/Taliya" class="mw-redirect" title="Taliya">Taliya</a></td>
<td>
</td></tr>
<tr>
<td>933</td>
<td><a href="/wiki/MTN_Irancell" title="MTN Irancell">MTN Irancell</a></td>
<td>
</td></tr>
<tr>
<td>934</td>
<td>Kish-TCI</td>
<td>
</td></tr>
<tr>
<td>935</td>
<td rowspan="5"><a href="/wiki/MTN_Irancell" title="MTN Irancell">MTN Irancell</a></td>
<td>
</td></tr>
<tr>
<td>936</td>
<td>
</td></tr>
<tr>
<td>937</td>
<td>
</td></tr>
<tr>
<td>938</td>
<td>
</td></tr>
<tr>
<td>939</td>
<td>
</td></tr>
<tr>
<td>990</td>
<td>10</td>
<td><a href="/wiki/Hamrah_Aval" class="mw-redirect" title="Hamrah Aval">Hamrah Aval</a></td>
<td>
</td></tr>
<tr>
<td>999 9</td>
<td>?</td>
<td><a href="/w/index.php?title=SamanTel&amp;action=edit&amp;redlink=1" class="new" title="SamanTel (page does not exist)">SamanTel</a></td>
<td>
</td></tr>
<tr>
<td rowspan="7"><a href="/wiki/Iraq" title="Iraq">Iraq</a></td>
<td rowspan="7"><a href="/wiki/%2B964" class="mw-redirect" title="+964">+964</a></td>
<td>73x</td>
<td rowspan="7">?</td>
<td>Korek Telecom (formerly SanaTel)</td>
<td>
</td></tr>
<tr>
<td>74x</td>
<td>Itisaluna and Kalemat</td>
<td>
</td></tr>
<tr>
<td>75x</td>
<td>Korek Telecom</td>
<td>
</td></tr>
<tr>
<td>76x</td>
<td>Mobitel (Iraq-Kurdistan) and Moutiny</td>
<td>
</td></tr>
<tr>
<td>77x</td>
<td>AsiaCell</td>
<td>
</td></tr>
<tr>
<td>78x</td>
<td>Zain Iraq (formerly MTC Atheer)</td>
<td>
</td></tr>
<tr>
<td>79x</td>
<td>Zain Iraq, (formerly Iraqna)</td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Ireland" title="Ireland">Ireland</a></td>
<td rowspan="6"><a href="/wiki/%2B353" class="mw-redirect" title="+353">+353</a></td>
<td>8x</td>
<td rowspan="6">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>83</td>
<td>Three</td>
<td>
</td></tr>
<tr>
<td>85</td>
<td>eir (Formerly Meteor)</td>
<td>
</td></tr>
<tr>
<td>86</td>
<td>Three (Formerly O<sub>2</sub>)</td>
<td>
</td></tr>
<tr>
<td>87</td>
<td>Vodafone</td>
<td>
</td></tr>
<tr>
<td>89</td>
<td>Tesco(MVNO)</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Isle_of_Man" title="Isle of Man">Isle of Man</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td rowspan="10"><a href="/wiki/Israel" title="Israel">Israel</a></td>
<td rowspan="10"><a href="/wiki/Telephone_numbers_in_Israel" title="Telephone numbers in Israel">+972</a></td>
<td>50</td>
<td rowspan="10">9</td>
<td>Pelephone / Walla Mobile / YouPhone</td>
<td rowspan="10">Users can now switch carriers and keep their cell phone numbers, including prefix
</td></tr>
<tr>
<td>52</td>
<td>Cellcom / MVoice
</td></tr>
<tr>
<td>53</td>
<td>Hot Mobile
</td></tr>
<tr>
<td>54</td>
<td>Partner / 012 Mobile
</td></tr>
<tr>
<td>5522 or 5523</td>
<td>Home Cellular
</td></tr>
<tr>
<td>556</td>
<td>Rami Levy Hashikma Marketing
</td></tr>
<tr>
<td>5570 or 5571</td>
<td>Cellact
</td></tr>
<tr>
<td>558</td>
<td>Pelephone / Walla Mobile / YouPhone
</td></tr>
<tr>
<td>559</td>
<td>019 Telecom
</td></tr>
<tr>
<td>58</td>
<td>Golan Telecom
</td></tr>
<tr>
<td rowspan="58"><span class="anchor" id="Italy"></span><a href="/wiki/Italy" title="Italy">Italy</a></td>
<td rowspan="58"><a href="/wiki/%2B39" class="mw-redirect" title="+39">+39</a></td>
<td>310</td>
<td rowspan="7">10</td>
<td><a href="/w/index.php?title=Elsacom&amp;action=edit&amp;redlink=1" class="new" title="Elsacom (page does not exist)">Elsacom</a> S.p.A. (Retired)</td>
<td rowspan="58">Users can now switch carriers and keep their cell phone numbers, including prefix. Usually NSN are 10 digits long for mobile and personal services.
</td></tr>
<tr>
<td>31100</td>
<td><a href="/wiki/Telespazio" title="Telespazio">Telespazio</a> S.p.A.
</td></tr>
<tr>
<td>31101</td>
<td><a href="/wiki/Telespazio" title="Telespazio">Telespazio</a> S.p.A.
</td></tr>
<tr>
<td>31105</td>
<td><a href="/w/index.php?title=Spal_Telecommunications&amp;action=edit&amp;redlink=1" class="new" title="Spal Telecommunications (page does not exist)">Spal Telecommunications</a> S.r.l.
</td></tr>
<tr>
<td>313</td>
<td>RFI <a href="/wiki/Rete_Ferroviaria_Italiana" title="Rete Ferroviaria Italiana">Rete Ferroviaria Italiana</a> S.p.A.
</td></tr>
<tr>
<td>319</td>
<td><a href="/w/index.php?title=Intermatica&amp;action=edit&amp;redlink=1" class="new" title="Intermatica (page does not exist)">Intermatica</a> S.r.l.
</td></tr>
<tr>
<td>320</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a>
</td></tr>
<tr>
<td>322</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a> operator reserved (routing number)
</td></tr>
<tr>
<td>323</td>
<td>12 ("32" + 10-digit MSISDN)</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a> operator reserved (voice mail)
</td></tr>
<tr>
<td>324</td>
<td rowspan="4">10</td>
<td rowspan="4"><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a>
</td></tr>
<tr>
<td>327
</td></tr>
<tr>
<td>328
</td></tr>
<tr>
<td>329
</td></tr>
<tr>
<td>330</td>
<td>9-10</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> there are many legacy 9-digit numbers
</td></tr>
<tr>
<td>331</td>
<td rowspan="3">10</td>
<td rowspan="3"><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>
</td></tr>
<tr>
<td>333
</td></tr>
<tr>
<td>334
</td></tr>
<tr>
<td>335</td>
<td rowspan="3">9-10</td>
<td rowspan="3"><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> there are a few legacy 9-digit numbers
</td></tr>
<tr>
<td>336
</td></tr>
<tr>
<td>337
</td></tr>
<tr>
<td>338</td>
<td rowspan="3">10</td>
<td rowspan="2"><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>
</td></tr>
<tr>
<td>339
</td></tr>
<tr>
<td>340</td>
<td><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a>
</td></tr>
<tr>
<td>341</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a> operator reserved (routing number)
</td></tr>
<tr>
<td>342</td>
<td>10</td>
<td><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a>
</td></tr>
<tr>
<td>343</td>
<td>12 ("34" + 10-digit MSISDN)</td>
<td><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a> operator reserved (voice mail)
</td></tr>
<tr>
<td>344</td>
<td rowspan="9">10</td>
<td rowspan="6"><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a>
</td></tr>
<tr>
<td>345
</td></tr>
<tr>
<td>346
</td></tr>
<tr>
<td>347
</td></tr>
<tr>
<td>348
</td></tr>
<tr>
<td>349
</td></tr>
<tr>
<td>3505</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/w/index.php?title=N%C3%B2verca&amp;action=edit&amp;redlink=1" class="new" title="Nòverca (page does not exist)">Nòverca</a> using <a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> network (retired 9 January 2015, users are being migrated to <a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>)
</td></tr>
<tr>
<td>3510</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/wiki/Lycamobile" title="Lycamobile">Lycamobile</a> using <a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a> network
</td></tr>
<tr>
<td>3512</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/wiki/Lycamobile" title="Lycamobile">Lycamobile</a>
</td></tr>
<tr>
<td>360</td>
<td>9-10</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> there are many legacy 9-digit numbers
</td></tr>
<tr>
<td>361</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> operator reserved (TACS legacy routing number)
</td></tr>
<tr>
<td>362</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> operator reserved (GSM/UMTS routing number)
</td></tr>
<tr>
<td>363</td>
<td>12 ("36" + 10-digit MSISDN)</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> operator reserved (voice mail)
</td></tr>
<tr>
<td>366</td>
<td>10</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>
</td></tr>
<tr>
<td>368</td>
<td>9-10</td>
<td><a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> there are many legacy 9-digit numbers
</td></tr>
<tr>
<td>370</td>
<td rowspan="6">10</td>
<td>various Light <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNOs</a> including Coop Voce, Noverca, Tiscali Mobile, Terrecablate Mobile. Operated by <a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>
</td></tr>
<tr>
<td>3710</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/wiki/BT_Mobile" title="BT Mobile">BT Mobile</a> using <a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a> network
</td></tr>
<tr>
<td>3711</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/wiki/PosteMobile" title="PosteMobile">PosteMobile</a> using <a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a> network
</td></tr>
<tr>
<td>373</td>
<td>various Light <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNOs</a> operated by <a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a>
</td></tr>
<tr>
<td>377</td>
<td>various Light <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNOs</a> including <a href="/wiki/PosteMobile" title="PosteMobile">PosteMobile</a>, Erg Mobile, Daily Telecom Mobile, Carrefour UNO Mobile, Bladna Mobile, BT Mobile, BT Enìa. Operated by <a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a>
</td></tr>
<tr>
<td>380</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a>
</td></tr>
<tr>
<td>381</td>
<td>13 (3 + 10)</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/w/index.php?title=N%C3%B2verca&amp;action=edit&amp;redlink=1" class="new" title="Nòverca (page does not exist)">Nòverca</a> operator reserved (routing number) (retired 9 January 2015)
</td></tr>
<tr>
<td>382</td>
<td>13 (3 + 10)</td>
<td>Full <a href="/wiki/Mobile_virtual_network_operator" title="Mobile virtual network operator">MVNO</a> <a href="/wiki/Lycamobile" title="Lycamobile">Lycamobile</a> operator reserved (routing number)
</td></tr>
<tr>
<td>383</td>
<td>12 ("38" + 10-digit MSISDN)</td>
<td><a href="/wiki/Vodafone_Italy" title="Vodafone Italy">Vodafone</a> operator reserved (voice mail)
</td></tr>
<tr>
<td>385</td>
<td rowspan="3">10</td>
<td><a href="/wiki/Telecom_Italia_S.p.A." class="mw-redirect" title="Telecom Italia S.p.A.">Telecom Italia S.p.A.</a> (not <a href="/wiki/Telecom_Italia_Mobile" class="mw-redirect" title="Telecom Italia Mobile">TIM</a>)
</td></tr>
<tr>
<td>388</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a>
</td></tr>
<tr>
<td>389</td>
<td><a href="/wiki/WIND_(Italy)" class="mw-redirect" title="WIND (Italy)">WIND</a>
</td></tr>
<tr>
<td>390</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a> operator reserved (voice mail)
</td></tr>
<tr>
<td>391</td>
<td rowspan="3">10</td>
<td><a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a> initially it was given to early business contracts; then it was operator reserved (employee numbers, system numbers e.g. <a href="/wiki/Short_message_service_center" class="mw-redirect" title="Short message service center">SMSC</a>) until 2013 when H3G started giving 391 numbers to regular users
</td></tr>
<tr>
<td>392</td>
<td><a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a>
</td></tr>
<tr>
<td>393</td>
<td><a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a>
</td></tr>
<tr>
<td>397</td>
<td>13 (3 + 10)</td>
<td><a href="/wiki/3_Italia" class="mw-redirect" title="3 Italia">H3G (Tre)</a> operator reserved (routing number)
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Ivory_Coast" title="Ivory Coast">Ivory Coast</a></td>
<td rowspan="2"><a href="/wiki/%2B225" class="mw-redirect" title="+225">+225</a></td>
<td>0x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Jamaica" title="Jamaica">Jamaica</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_876" class="mw-redirect" title="Area code 876">876</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Jan_Mayen" title="Jan Mayen">Jan Mayen</a></td>
<td>+47</td>
<td><a href="/wiki/Telephone_numbers_in_Jan_Mayen" class="mw-redirect" title="Telephone numbers in Jan Mayen">79</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Norway">Norway</a> and <a href="#Svalbard">Svalbard</a>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Japan" title="Japan">Japan</a><sup id="cite_ref-8" class="reference"><a href="#cite_note-8">[6]</a></sup>
</td>
<td rowspan="4"><a href="/wiki/%2B81" class="mw-redirect" title="+81">+81</a>
</td>
<td>60
</td>
<td rowspan="4">10
</td>
<td>
</td>
<td>
<p>Under governmental consideration (Will be released when exhausting other prefixes)
</p>
</td></tr>
<tr>
<td>70</td>
<td rowspan="3">
<ul><li><a href="/wiki/NTT_Docomo" title="NTT Docomo">NTT DOCOMO</a></li>
<li><a href="/wiki/Au_(mobile_phone_company)" title="Au (mobile phone company)">au</a></li>
<li><a href="/wiki/SoftBank_Group#SoftBank_Corp." title="SoftBank Group">SoftBank</a></li>
<li><a href="/w/index.php?title=Rakuten_Mobile&amp;action=edit&amp;redlink=1" class="new" title="Rakuten Mobile (page does not exist)">Rakuten Mobile</a> (April, 2020 - )</li>
<li><a href="/wiki/Mobile_virtual_network_operator#Around_the_world" title="Mobile virtual network operator">MVNOs</a></li></ul>
</td>
<td>
<p>Released in November 2013
</p>
</td></tr>
<tr>
<td>80</td>
<td>
<p>Released in March 2002
</p>
</td></tr>
<tr>
<td>90</td>
<td>
<p>Released in January 1999
</p>
</td></tr>
<tr>
<td><a href="/wiki/Jersey" title="Jersey">Jersey</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Jordan" title="Jordan">Jordan</a></td>
<td rowspan="3"><a href="/wiki/%2B962" class="mw-redirect" title="+962">+962</a></td>
<td>77</td>
<td rowspan="3">9</td>
<td>Orange</td>
<td>example +962 77 000 0000 with country code is 12 digits
</td></tr>
<tr>
<td>79</td>
<td>Zain Jordan</td>
<td>example +962 79 000 0000 with country code is 12 digits
</td></tr>
<tr>
<td>78</td>
<td>Umniah</td>
<td>example +962 78 000 0000 with country code is 12 digits
</td></tr>
<tr>
<td rowspan="12"><a href="/wiki/Kazakhstan" title="Kazakhstan">Kazakhstan</a></td>
<td rowspan="12"><a href="/wiki/%2B7" title="+7">+7</a></td>
<td>700</td>
<td rowspan="12">10</td>
<td rowspan="2">Altel</td>
<td>
</td></tr>
<tr>
<td>708</td>
<td>
</td></tr>
<tr>
<td>701</td>
<td rowspan="4"><a href="/wiki/Kcell" title="Kcell">Kcell</a> GSM</td>
<td>
</td></tr>
<tr>
<td>702</td>
<td>
</td></tr>
<tr>
<td>775</td>
<td>
</td></tr>
<tr>
<td>778</td>
<td>
</td></tr>
<tr>
<td>705</td>
<td rowspan="4"><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a> GSM</td>
<td>
</td></tr>
<tr>
<td>771</td>
<td>
</td></tr>
<tr>
<td>776</td>
<td>
</td></tr>
<tr>
<td>777</td>
<td>
</td></tr>
<tr>
<td>707</td>
<td rowspan="2"><a href="/wiki/Tele2" title="Tele2">Tele2</a> GSM</td>
<td>
</td></tr>
<tr>
<td>747</td>
<td>
</td></tr>
<tr>
<td rowspan="11"><a href="/wiki/Kenya" title="Kenya">Kenya</a></td>
<td rowspan="11"><a href="/wiki/%2B254" class="mw-redirect" title="+254">+254</a>
</td>
<td>10x</td>
<td rowspan="11">10</td>
<td><a href="/wiki/Zain_Group" title="Zain Group">Airtel</a></td>
<td>
</td></tr>
<tr>
<td>11x</td>
<td rowspan="4"><a href="/wiki/Safaricom" title="Safaricom">Safaricom</a></td>
<td>
</td></tr>
<tr>
<td>70x</td>
<td>
</td></tr>
<tr>
<td>71x</td>
<td>
</td></tr>
<tr>
<td>72x</td>
<td>
</td></tr>
<tr>
<td>73x</td>
<td><a href="/wiki/Zain_Group" title="Zain Group">Airtel</a></td>
<td>
</td></tr>
<tr>
<td>74x</td>
<td><a href="/w/index.php?title=FAIBA&amp;action=edit&amp;redlink=1" class="new" title="FAIBA (page does not exist)">Jamii</a></td>
<td>
</td></tr>
<tr>
<td>75x</td>
<td><a href="/wiki/Aegis_BPO" class="mw-redirect" title="Aegis BPO">Yu</a></td>
<td>
</td></tr>
<tr>
<td>763</td>
<td><a href="/wiki/Finserve_Africa_Limited" class="mw-redirect" title="Finserve Africa Limited">Equitel</a></td>
<td>
</td></tr>
<tr>
<td>77x</td>
<td><a href="/wiki/Orange_S.A." title="Orange S.A.">Orange</a></td>
<td>
</td></tr>
<tr>
<td>78x</td>
<td><a href="/wiki/Zain_Group" title="Zain Group">Airtel</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Kiribati" title="Kiribati">Kiribati</a></td>
<td rowspan="2"><a href="/wiki/%2B686" class="mw-redirect" title="+686">+686</a></td>
<td>63</td>
<td rowspan="2">8</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7x</td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Kosovo" title="Kosovo">Kosovo</a></td>
<td rowspan="3"><a href="/wiki/%2B383" class="mw-redirect" title="+383">+383</a></td>
<td>44</td>
<td rowspan="3">8</td>
<td><a href="/wiki/Post_and_Telecom_of_Kosovo" class="mw-redirect" title="Post and Telecom of Kosovo">Post and Telecom of Kosovo</a></td>
<td>
</td></tr>
<tr>
<td>45</td>
<td><a href="/w/index.php?title=Z_mobile&amp;action=edit&amp;redlink=1" class="new" title="Z mobile (page does not exist)">Z mobile</a></td>
<td>
</td></tr>
<tr>
<td>49</td>
<td><a href="/wiki/IPKO" title="IPKO">IPKO</a></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Kuwait" title="Kuwait">Kuwait</a></td>
<td rowspan="3"><a href="/wiki/%2B965" class="mw-redirect" title="+965">+965</a></td>
<td>5</td>
<td rowspan="3">8</td>
<td>Viva</td>
<td>
</td></tr>
<tr>
<td>6</td>
<td><a href="/wiki/Ooredoo" title="Ooredoo">Ooredoo Kuwait</a></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td><a href="/wiki/Zain_Group" title="Zain Group">Zain</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Kyrgyzstan" title="Kyrgyzstan">Kyrgyzstan</a></td>
<td><a href="/wiki/%2B996" class="mw-redirect" title="+996">+996</a></td>
<td>5xx</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Laos" title="Laos">Laos</a></td>
<td><a href="/wiki/%2B856" class="mw-redirect" title="+856">+856</a></td>
<td>20</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Latvia" title="Latvia">Latvia</a></td>
<td><a href="/wiki/%2B371" class="mw-redirect" title="+371">+371</a></td>
<td>2xx</td>
<td>8</td>
<td></td>
<td>There are 4 mobile operators (LMT, Tele2, Bite, Triatel)
<p>All mobile phone numbers start with "2" and each of them has 8 digits (without country code),.
</p><p>For example: +371 2 63 12345
</p>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Lebanon" title="Lebanon">Lebanon</a></td>
<td rowspan="4"><a href="/wiki/%2B961" class="mw-redirect" title="+961">+961</a></td>
<td>3</td>
<td>7?</td>
<td>(03-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch</td>
<td>
</td></tr>
<tr>
<td>70</td>
<td rowspan="3">8?</td>
<td>(70-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch</td>
<td>
</td></tr>
<tr>
<td>71</td>
<td>(71-Abcdef) where A is 1/2/3/4/5 for Touch and 0/6/7/8/9 for Alfa</td>
<td>
</td></tr>
<tr>
<td>76</td>
<td>(76-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch, until 01–2011, only 76-6 &amp; 76-7 are available</td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Lesotho" title="Lesotho">Lesotho</a></td>
<td rowspan="2"><a href="/wiki/%2B266" class="mw-redirect" title="+266">+266</a></td>
<td>58</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6x</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Liberia" title="Liberia">Liberia</a></td>
<td rowspan="6"><a href="/wiki/%2B231" class="mw-redirect" title="+231">+231</a></td>
<td>46</td>
<td rowspan="5">7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>47</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>64</td>
<td></td>
<td>
</td></tr>
<tr>
<td>65</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Libya" title="Libya">Libya</a></td>
<td rowspan="3"><a href="/wiki/%2B218" class="mw-redirect" title="+218">+218</a></td>
<td>91</td>
<td rowspan="3">10</td>
<td><a href="/w/index.php?title=AL-MADAR&amp;action=edit&amp;redlink=1" class="new" title="AL-MADAR (page does not exist)">AL-MADAR</a></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td rowspan="2"><a href="/w/index.php?title=LIBYANA&amp;action=edit&amp;redlink=1" class="new" title="LIBYANA (page does not exist)">LIBYANA</a></td>
<td>
</td></tr>
<tr>
<td>94</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Liechtenstein" title="Liechtenstein">Liechtenstein</a></td>
<td><a href="/wiki/%2B423" class="mw-redirect" title="+423">+423</a></td>
<td>7</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Lithuania" title="Lithuania">Lithuania</a></td>
<td><a href="/wiki/%2B370" class="mw-redirect" title="+370">+370</a></td>
<td>6xx</td>
<td>8</td>
<td>Bitė Lietuva, Tele2, Telia (previously Omnitel), Eurocom</td>
<td style="text-align:right;">+370 6xx xx xxx<br>Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Luxembourg" title="Luxembourg">Luxembourg</a></td>
<td rowspan="6"><a href="/wiki/%2B352" class="mw-redirect" title="+352">+352</a></td>
<td>621</td>
<td rowspan="6">9</td>
<td rowspan="2"><a href="/wiki/LuxGSM" class="mw-redirect" title="LuxGSM">LuxGSM</a></td>
<td>
</td></tr>
<tr>
<td>628</td>
<td>
</td></tr>
<tr>
<td>661</td>
<td rowspan="2"><a href="/wiki/Orange_S.A." title="Orange S.A.">Orange</a></td>
<td>
</td></tr>
<tr>
<td>668</td>
<td>
</td></tr>
<tr>
<td>691</td>
<td rowspan="2"><a href="/wiki/Tango_Mobile" class="mw-redirect" title="Tango Mobile">Tango Mobile</a></td>
<td>
</td></tr>
<tr>
<td>698</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Macau" title="Macau">Macau</a></td>
<td><a href="/wiki/%2B853" class="mw-redirect" title="+853">+853</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Madagascar" title="Madagascar">Madagascar</a></td>
<td><a href="/wiki/%2B261" class="mw-redirect" title="+261">+261</a></td>
<td>3x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Madeira" title="Madeira">Madeira</a></td>
<td>+351</td>
<td><a href="/wiki/Telephone_numbers_in_Madeira" class="mw-redirect" title="Telephone numbers in Madeira">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Portugal">Portugal</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Malawi" title="Malawi">Malawi</a></td>
<td rowspan="2"><a href="/wiki/%2B265" class="mw-redirect" title="+265">+265</a></td>
<td>8</td>
<td>TNM</td>
<td></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td>Celtel</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Malaysia" title="Malaysia">Malaysia</a></td>
<td rowspan="9"><a href="/wiki/%2B60" class="mw-redirect" title="+60">+60</a></td>
<td>10</td>
<td>7</td>
<td><a href="/wiki/DiGi_Telecommunications" class="mw-redirect" title="DiGi Telecommunications">DiGi</a></td>
<td>
</td></tr>
<tr>
<td>11</td>
<td>8</td>
<td rowspan="2"><a href="/wiki/Maxis_Communications" title="Maxis Communications">Maxis</a></td>
<td>
</td></tr>
<tr>
<td>12
</td>
<td rowspan="7">7</td>
<td>
</td></tr>
<tr>
<td>13</td>
<td><a href="/wiki/Celcom" title="Celcom">Celcom</a></td>
<td>
</td></tr>
<tr>
<td>14</td>
<td rowspan="2"><a href="/wiki/DiGi_Telecommunications" class="mw-redirect" title="DiGi Telecommunications">DiGi</a></td>
<td>
</td></tr>
<tr>
<td>16</td>
<td>
</td></tr>
<tr>
<td>17</td>
<td><a href="/wiki/Maxis_Communications" title="Maxis Communications">Maxis</a></td>
<td>
</td></tr>
<tr>
<td>18</td>
<td><a href="/wiki/U_Mobile" title="U Mobile">U Mobile</a></td>
<td>
</td></tr>
<tr>
<td>19</td>
<td><a href="/wiki/Celcom" title="Celcom">Celcom</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Maldives" title="Maldives">Maldives</a></td>
<td rowspan="2"><a href="/wiki/%2B960" class="mw-redirect" title="+960">+960</a></td>
<td>7</td>
<td rowspan="2">7</td>
<td><a href="/wiki/Dhiraagu" title="Dhiraagu">Dhiraagu</a></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td><a href="/wiki/Ooredoo" title="Ooredoo">Ooredoo</a></td>
<td>
</td></tr>
<tr>
<td rowspan="5"><span class="anchor" id="Mali"></span><a href="/wiki/Mali" title="Mali">Mali</a></td>
<td rowspan="5"><a href="/wiki/%2B223" class="mw-redirect" title="+223">+223</a></td>
<td>3</td>
<td rowspan="3">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>4</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6</td>
<td rowspan="2">8</td>
<td>Malitel</td>
<td>
</td></tr>
<tr>
<td>7</td>
<td>Orange Mali</td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Malta" title="Malta">Malta</a></td>
<td rowspan="4"><a href="/wiki/%2B356" class="mw-redirect" title="+356">+356</a></td>
<td>77</td>
<td rowspan="4">8</td>
<td>Melita Mobile Ltd</td>
<td>
</td></tr>
<tr>
<td>79</td>
<td>Go Mobile Ltd &amp; MTV Mobile</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td>Red Touch Phone</td>
<td>
</td></tr>
<tr>
<td>99</td>
<td>Epic Malta</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Marshall_Islands" title="Marshall Islands">Marshall Islands</a></td>
<td><a href="/wiki/%2B692" class="mw-redirect" title="+692">+692</a></td>
<td>??</td>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Martinique"></span><a href="/wiki/Martinique" title="Martinique">Martinique</a></td>
<td rowspan="2"><a href="/wiki/%2B596" class="mw-redirect" title="+596">+596</a></td>
<td>696</td>
<td>9</td>
<td></td>
<td>+596 696 xx xx xx
</td></tr>
<tr>
<td>700</td>
<td>12?</td>
<td></td>
<td>(NSN = 12 means +596 700 xxx xxx xxx)
</td></tr>
<tr>
<td><a href="/wiki/Mauritania" title="Mauritania">Mauritania</a></td>
<td><a href="/wiki/%2B222" class="mw-redirect" title="+222">+222</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Mauritius" title="Mauritius">Mauritius</a></td>
<td rowspan="4"><a href="/wiki/%2B230" class="mw-redirect" title="+230">+230</a></td>
<td>57</td>
<td rowspan="4">8</td>
<td></td>
<td>
</td></tr>
<tr>
<td>58</td>
<td></td>
<td>
</td></tr>
<tr>
<td>59</td>
<td></td>
<td>
</td></tr>
<tr>
<td>54
</td>
<td>
</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Mayotte" title="Mayotte">Mayotte</a></td>
<td>+262</td>
<td><a href="/wiki/Telephone_numbers_in_Mayotte" class="mw-redirect" title="Telephone numbers in Mayotte">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Réunion">Réunion</a>
</td></tr>
<tr>
<td><a href="/wiki/Melilla" title="Melilla">Melilla</a></td>
<td>+34</td>
<td><a href="/wiki/Telephone_numbers_in_Melilla" title="Telephone numbers in Melilla">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Spain">Spain</a>
</td></tr>
<tr>
<td><a href="/wiki/Mexico" title="Mexico">Mexico</a></td>
<td><a href="/wiki/%2B52" class="mw-redirect" title="+52">+52</a></td>
<td>1</td>
<td>10</td>
<td>Telcel, Movistar, IUSACell, Nextel, UNEFON, Virgin Mobile, Tuenti</td>
<td>+52 then three digits for code area and seven for mobile line ID. Example +52 000 1234567
</td></tr>
<tr>
<td rowspan="7"><span class="anchor" id="Moldova"></span><a href="/wiki/Moldova" title="Moldova">Moldova</a></td>
<td rowspan="7"><a href="/wiki/%2B373" class="mw-redirect" title="+373">+373</a></td>
<td>60xxxxxx</td>
<td rowspan="7">8</td>
<td><a href="/wiki/Orange_Moldova" title="Orange Moldova">Orange</a></td>
<td>
</td></tr>
<tr>
<td>65xxxxxx</td>
<td><a href="/wiki/Eventis" title="Eventis">Eventis</a></td>
<td>
</td></tr>
<tr>
<td>67xxxxxx</td>
<td><a href="/wiki/Unit%C3%A9" title="Unité">Unité</a></td>
<td>
</td></tr>
<tr>
<td>68xxxxxx</td>
<td rowspan="2"><a href="/wiki/Orange_Moldova" title="Orange Moldova">Orange</a></td>
<td>
</td></tr>
<tr>
<td>69xxxxxx</td>
<td>
</td></tr>
<tr>
<td>78xxxxxx</td>
<td rowspan="2"><a href="/wiki/Moldcell" title="Moldcell">Moldcell</a></td>
<td>
</td></tr>
<tr>
<td>79xxxxxx</td>
<td>
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Monaco"></span><a href="/wiki/Monaco" title="Monaco">Monaco</a></td>
<td rowspan="2"><a href="/wiki/%2B377" class="mw-redirect" title="+377">+377</a></td>
<td>4</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>6</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="10"><a href="/wiki/Mongolia" title="Mongolia">Mongolia</a></td>
<td rowspan="10"><a href="/wiki/%2B976" class="mw-redirect" title="+976">+976</a></td>
<td>70xxxxxx</td>
<td rowspan="10">8</td>
<td><a href="/wiki/Mongolia_Telecom_Company" title="Mongolia Telecom Company">Mongolian Telecom Company</a></td>
<td style="text-align:right;">The first telecom company of Mongolia
</td></tr>
<tr>
<td>88xxxxxx</td>
<td rowspan="2"><a href="/wiki/Unitel_(Mongolia)" title="Unitel (Mongolia)">Unitel Corporation</a></td>
<td>
</td></tr>
<tr>
<td>89xxxxxx</td>
<td>
</td></tr>
<tr>
<td>91xxxxxx</td>
<td><a href="/wiki/Skytel_(Mongolia)" title="Skytel (Mongolia)">Skytel</a></td>
<td style="text-align:right;">The second largest mobile network coverage in Mongolia
</td></tr>
<tr>
<td>93xxxxxx</td>
<td><a href="/wiki/G-Mobile" title="G-Mobile">G-Mobile</a></td>
<td style="text-align:right;">The newest mobile network of Mongolia
</td></tr>
<tr>
<td>94xxxxxx</td>
<td rowspan="2"><a href="/wiki/Mobicom_Corporation" title="Mobicom Corporation">Mobicom Corporation</a></td>
<td style="text-align:right;">The first Mongolian cellphone operator
</td></tr>
<tr>
<td>95xxxxxx</td>
<td style="text-align:right;">The first Mongolian cellphone operator
</td></tr>
<tr>
<td>96xxxxxx</td>
<td><a href="/wiki/Skytel_(Mongolia)" title="Skytel (Mongolia)">Skytel</a></td>
<td style="text-align:right;">The second largest mobile network coverage in Mongolia
</td></tr>
<tr>
<td>98xxxxxx</td>
<td><a href="/wiki/G-Mobile" title="G-Mobile">G-Mobile</a></td>
<td style="text-align:right;">The newest mobile network of Mongolia
</td></tr>
<tr>
<td>99xxxxxx</td>
<td><a href="/wiki/Mobicom_Corporation" title="Mobicom Corporation">Mobicom Corporation</a></td>
<td style="text-align:right;">The first Mongolian cellphone operator
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Montenegro" title="Montenegro">Montenegro</a></td>
<td rowspan="6"><a href="/wiki/%2B382" class="mw-redirect" title="+382">+382</a></td>
<td>60</td>
<td rowspan="6">8</td>
<td>Revolucija, VMNO under <a href="/wiki/MTEL_CG" class="mw-redirect" title="MTEL CG">MTEL CG</a></td>
<td>
</td></tr>
<tr>
<td>63</td>
<td><a href="/wiki/Telenor_Montenegro" title="Telenor Montenegro">Telenor Montenegro</a></td>
<td>
</td></tr>
<tr>
<td>66</td>
<td>Volim, VMNO under <a href="/wiki/T-Mobile" title="T-Mobile">T-Mobile</a></td>
<td>
</td></tr>
<tr>
<td>67</td>
<td><a href="/wiki/T-Mobile" title="T-Mobile">T-Mobile</a></td>
<td>
</td></tr>
<tr>
<td>68</td>
<td><a href="/wiki/MTEL_CG" class="mw-redirect" title="MTEL CG">MTEL CG</a></td>
<td>
</td></tr>
<tr>
<td>69</td>
<td><a href="/wiki/Telenor_Montenegro" title="Telenor Montenegro">Telenor Montenegro</a></td>
<td style="text-align:right;"><a href="/wiki/Telenor" title="Telenor">Telenor Mobile Communications AS</a>
</td></tr>
<tr>
<td><a href="/wiki/Montserrat" title="Montserrat">Montserrat</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_664" title="Area code 664">664</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><span class="anchor" id="Morocco"></span><a href="/wiki/Morocco" title="Morocco">Morocco</a></td>
<td><a href="/wiki/%2B212" class="mw-redirect" title="+212">+212</a></td>
<td>6x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Mozambique" title="Mozambique">Mozambique</a></td>
<td><a href="/wiki/%2B258" class="mw-redirect" title="+258">+258</a></td>
<td>82
<p>83
</p><p>84
</p><p>85
</p><p>86
</p><p>87
</p>
</td>
<td>12</td>
<td>Tmcel
<p>Tmcel
</p><p>Vodacom
</p><p>Vodacom
</p><p>Movitel
</p><p>Movitel
</p>
</td>
<td>
</td></tr>
<tr>
<td rowspan="16"><span class="anchor" id="Myanmar"></span><a href="/wiki/Myanmar" title="Myanmar">Myanmar</a></td>
<td rowspan="16"><a href="/wiki/%2B95" class="mw-redirect" title="+95">+95</a></td>
<td>92xxxxxx</td>
<td>8</td>
<td rowspan="10">MPT
</td>
<td rowspan="16">
</td></tr>
<tr>
<td>925xxxxxxx</td>
<td rowspan="2">10
</td></tr>
<tr>
<td>926xxxxxxx
</td></tr>
<tr>
<td>943xxxxxx</td>
<td>9
</td></tr>
<tr>
<td>94xxxxxxxx</td>
<td>10
</td></tr>
<tr>
<td>944xxxxxx</td>
<td>9
</td></tr>
<tr>
<td>95xxxxxx</td>
<td rowspan="2">8
</td></tr>
<tr>
<td>96xxxxxx
</td></tr>
<tr>
<td>973xxxxxx</td>
<td rowspan="3">9
</td></tr>
<tr>
<td>991xxxxxx
</td></tr>
<tr>
<td>93xxxxxxx</td>
<td>MEC
</td></tr>
<tr>
<td>996xxxxxxx</td>
<td rowspan="5">10</td>
<td rowspan="2">Ooredoo Myanmar
</td></tr>
<tr>
<td>997xxxxxxx
</td></tr>
<tr>
<td>977xxxxxxx</td>
<td rowspan="3">Telenor Myanmar
</td></tr>
<tr>
<td>978xxxxxxx
</td></tr>
<tr>
<td>979xxxxxxx
</td></tr>
<tr>
<td><a href="/wiki/Republic_of_Artsakh" title="Republic of Artsakh">Artsakh</a></td>
<td>+374</td>
<td><a href="/wiki/Telephone_numbers_in_the_Republic_of_Artsakh" title="Telephone numbers in the Republic of Artsakh">97</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Armenia">Armenia</a>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Namibia" title="Namibia">Namibia</a></td>
<td rowspan="3"><a href="/wiki/%2B264" class="mw-redirect" title="+264">+264</a></td>
<td>60</td>
<td rowspan="3">?</td>
<td><a href="/wiki/Telecom_Namibia" title="Telecom Namibia">Switch</a></td>
<td style="text-align:right;">National telecommunications operator wholly owned by the Government of the Republic of Namibia
</td></tr>
<tr>
<td>81</td>
<td><a href="/wiki/Mobile_Telecommunications_Limited" class="mw-redirect" title="Mobile Telecommunications Limited">MTC</a></td>
<td>
</td></tr>
<tr>
<td>85</td>
<td><a href="/wiki/Leo_Namibia" class="mw-redirect" title="Leo Namibia">Leo</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Nauru" title="Nauru">Nauru</a></td>
<td><a href="/wiki/%2B674" class="mw-redirect" title="+674">+674</a></td>
<td>555</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Nepal" title="Nepal">Nepal</a></td>
<td><a href="/wiki/%2B977" class="mw-redirect" title="+977">+977</a></td>
<td>98xxxxxxxx</td>
<td>10</td>
<td>Nepal Telecom, Ncell</td>
<td>13 digits including country code ( 977 )
</td></tr>
<tr>
<td><a href="/wiki/Netherlands" title="Netherlands">Netherlands</a></td>
<td><a href="/wiki/%2B31" class="mw-redirect" title="+31">+31</a></td>
<td>6</td>
<td>9</td>
<td></td>
<td>Except 67 (reserved for data services and dial up internet).
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/New_Caledonia" title="New Caledonia">New Caledonia</a></td>
<td rowspan="3"><a href="/wiki/%2B687" class="mw-redirect" title="+687">+687</a></td>
<td>7</td>
<td rowspan="3">6</td>
<td></td>
<td>
</td></tr>
<tr>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="11"><span class="anchor" id="New_Zealand"></span><a href="/wiki/New_Zealand" title="New Zealand">New Zealand</a></td>
<td rowspan="11"><a href="/wiki/%2B64" class="mw-redirect" title="+64">+64</a></td>
<td>20</td>
<td>?</td>
<td><a href="/wiki/Orcon_Internet_Limited" title="Orcon Internet Limited">Orcon</a></td>
<td>
</td></tr>
<tr>
<td>21</td>
<td>8-10</td>
<td><a href="/wiki/Vodafone_New_Zealand" title="Vodafone New Zealand">Vodafone</a></td>
<td>6 to 8 digits
</td></tr>
<tr>
<td>22</td>
<td>9</td>
<td><a href="/wiki/2degrees" title="2degrees">2degrees</a></td>
<td>7 digits
</td></tr>
<tr>
<td>24</td>
<td>?</td>
<td><i>Unused</i></td>
<td>Protected by Management Committee on 30 January 2009 to preserve the potential code expansion option.
</td></tr>
<tr>
<td>25</td>
<td>8-9</td>
<td><i>Unused</i></td>
<td>6-7 digits - Was used by <a href="/wiki/Telecom_New_Zealand" class="mw-redirect" title="Telecom New Zealand">Telecom New Zealand</a> (now called Spark) until it was shut down on 31 March 2007. All numbers have now migrated to 027 (7-digit) and 0274 (6-digit).
</td></tr>
<tr>
<td>27</td>
<td>9</td>
<td><a href="/wiki/Spark_New_Zealand" title="Spark New Zealand">Spark New Zealand</a></td>
<td>7 digits
</td></tr>
<tr>
<td>280</td>
<td rowspan="5">?</td>
<td><a href="/w/index.php?title=Compass_Communications_LTD&amp;action=edit&amp;redlink=1" class="new" title="Compass Communications LTD (page does not exist)">Compass Communications</a></td>
<td>
</td></tr>
<tr>
<td>28</td>
<td>Mainly <a href="/wiki/CallPlus_New_Zealand" class="mw-redirect" title="CallPlus New Zealand">CallPlus</a></td>
<td>
</td></tr>
<tr>
<td>283</td>
<td>Teletraders MVNO</td>
<td>
</td></tr>
<tr>
<td>28</td>
<td>M2 MVNO</td>
<td>
</td></tr>
<tr>
<td>29</td>
<td><a href="/wiki/TelstraClear" title="TelstraClear">TelstraClear</a></td>
<td>Acquired by Vodafone.
</td></tr>
<tr>
<td><a href="/wiki/Nicaragua" title="Nicaragua">Nicaragua</a></td>
<td><a href="/wiki/%2B505" class="mw-redirect" title="+505">+505</a></td>
<td>8</td>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Niger" title="Niger">Niger</a></td>
<td><a href="/wiki/%2B227" class="mw-redirect" title="+227">+227</a></td>
<td>9</td>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Nigeria" title="Nigeria">Nigeria</a></td>
<td rowspan="5"><a href="/wiki/%2B234" class="mw-redirect" title="+234">+234</a></td>
<td>804</td>
<td rowspan="5">8</td>
<td><a href="/w/index.php?title=Ntel&amp;action=edit&amp;redlink=1" class="new" title="Ntel (page does not exist)">ntel</a></td>
<td>
</td></tr>
<tr>
<td>805</td>
<td><a href="/wiki/Globacom" class="mw-redirect" title="Globacom">glo</a></td>
<td>
</td></tr>
<tr>
<td>803</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">mtn</a></td>
<td>
</td></tr>
<tr>
<td>802</td>
<td><a href="/wiki/Airtel_Africa" title="Airtel Africa">airtel</a></td>
<td>
</td></tr>
<tr>
<td>809</td>
<td><a href="/wiki/Etisalat" title="Etisalat">etisalat</a></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Niue" title="Niue">Niue</a></td>
<td rowspan="3"><a href="/wiki/%2B683" class="mw-redirect" title="+683">+683</a></td>
<td>1</td>
<td rowspan="3">4</td>
<td></td>
<td>
</td></tr>
<tr>
<td>3</td>
<td></td>
<td>
</td></tr>
<tr>
<td>4</td>
<td></td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Norfolk_Island"></span><a href="/wiki/Norfolk_Island" title="Norfolk Island">Norfolk Island</a></td>
<td><a href="/wiki/%2B672" class="mw-redirect" title="+672">+672</a></td>
<td>38</td>
<td>6</td>
<td></td>
<td>See also <a href="#Australian_Antarctic_Territory">Australian Antarctic Territory</a>
</td></tr>
<tr>
<td><a href="/wiki/North_Korea" title="North Korea">North Korea</a></td>
<td><a href="/wiki/%2B850" class="mw-redirect" title="+850">+850</a></td>
<td>?</td>
<td></td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="10"><a href="/wiki/North_Macedonia" title="North Macedonia">North Macedonia</a></td>
<td rowspan="10"><a href="/wiki/%2B389" class="mw-redirect" title="+389">+389</a></td>
<td>70</td>
<td rowspan="10">8</td>
<td rowspan="3"><a href="/wiki/Makedonski_Telekom" title="Makedonski Telekom">Makedonski Telekom</a></td>
<td rowspan="10">Users can switch carriers and keep their cell phone numbers, including prefix.
</td></tr>
<tr>
<td>71
</td></tr>
<tr>
<td>72
</td></tr>
<tr>
<td>73</td>
<td><a href="/w/index.php?title=Green_Mobile_MK&amp;action=edit&amp;redlink=1" class="new" title="Green Mobile MK (page does not exist)">Green Mobile MK</a>
</td></tr>
<tr>
<td>74</td>
<td><a href="/wiki/Telekabel" title="Telekabel">Telekabel</a>
</td></tr>
<tr>
<td>75</td>
<td rowspan="4"><a href="/wiki/A1_Macedonia" title="A1 Macedonia">A1 Macedonia</a>
</td></tr>
<tr>
<td>76
</td></tr>
<tr>
<td>77
</td></tr>
<tr>
<td>78
</td></tr>
<tr>
<td>79</td>
<td><a href="/w/index.php?title=Lycamobile_MK&amp;action=edit&amp;redlink=1" class="new" title="Lycamobile MK (page does not exist)">Lycamobile MK</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Northern_Cyprus" title="Northern Cyprus">Northern Cyprus</a></td>
<td rowspan="2">+90</td>
<td><a href="/wiki/Telephone_numbers_in_Northern_Cyprus" title="Telephone numbers in Northern Cyprus">533</a></td>
<td>7</td>
<td></td>
<td rowspan="2">See <a href="#Turkey">Turkey</a>
</td></tr>
<tr>
<td><a href="/wiki/Telephone_numbers_in_Northern_Cyprus" title="Telephone numbers in Northern Cyprus">542</a></td>
<td>?</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Northern_Ireland" title="Northern Ireland">Northern Ireland</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td><a href="/wiki/Northern_Mariana_Islands" title="Northern Mariana Islands">Northern Mariana Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_670" title="Area code 670">670</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td rowspan="3"><span class="anchor" id="Norway"></span><a href="/wiki/Norway" title="Norway">Norway</a></td>
<td rowspan="3"><a href="/wiki/%2B47" class="mw-redirect" title="+47">+47</a></td>
<td>4</td>
<td rowspan="3">8</td>
<td></td>
<td>+47 4x xx xx xx
</td></tr>
<tr>
<td>59</td>
<td></td>
<td>+47 59 xx xx xx Machine-to-machine communication, also work with SMS and calls. See also <a rel="nofollow" class="external text" href="http://eng.nkom.no/market/numbering/e.164-numbering-plan/general-norwegian-numbering-plan-for-telephony-etc.e.164">NKOM numbering plan</a>.
</td></tr>
<tr>
<td>9</td>
<td></td>
<td>+47 9x xx xx xx
</td></tr>
<tr>
<td rowspan="10"><a href="/wiki/Oman" title="Oman">Oman</a></td>
<td rowspan="10"><a href="/wiki/%2B968" class="mw-redirect" title="+968">+968</a></td>
<td>91</td>
<td>8</td>
<td></td>
<td>Paging, now retired
</td></tr>
<tr>
<td>91</td>
<td></td>
<td rowspan="2"><a href="/wiki/Oman_Mobile" class="mw-redirect" title="Oman Mobile">Oman Mobile</a></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td rowspan="8">?</td>
<td>
</td></tr>
<tr>
<td>93</td>
<td rowspan="5"><a href="/wiki/Nawras" class="mw-redirect" title="Nawras">Nawras</a></td>
<td>
</td></tr>
<tr>
<td>94</td>
<td>
</td></tr>
<tr>
<td>95</td>
<td>
</td></tr>
<tr>
<td>96</td>
<td>
</td></tr>
<tr>
<td>97</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td><a href="/w/index.php?title=Friendy&amp;action=edit&amp;redlink=1" class="new" title="Friendy (page does not exist)">Friendy</a></td>
<td>
</td></tr>
<tr>
<td>99</td>
<td><a href="/wiki/Oman_Mobile" class="mw-redirect" title="Oman Mobile">Oman Mobile</a></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Pakistan" title="Pakistan">Pakistan</a></td>
<td rowspan="6"><a href="/wiki/%2B92" class="mw-redirect" title="+92">+92</a></td>
<td>3xx MOBILE CODE</td>
<td rowspan="6">10</td>
<td>ALL PAKISTAN MOBILE OPERATORS</td>
<td>Format +92 3XX YYYZZZZ <a href="/wiki/List_of_mobile_codes_in_Pakistan" class="mw-redirect" title="List of mobile codes in Pakistan">List of mobile codes in Pakistan</a>
</td></tr>
<tr>
<td>30x</td>
<td><a href="/wiki/Mobilink" title="Mobilink">Mobilink</a></td>
<td>+92 30X YYYZZZZ
</td></tr>
<tr>
<td>31x</td>
<td><a href="/wiki/Zong_(mobile_network_operator)" class="mw-redirect" title="Zong (mobile network operator)">Zong</a></td>
<td>+92 31X YYYZZZZ (formerly <a href="/wiki/Paktel" title="Paktel">Paktel</a>)
</td></tr>
<tr>
<td>32x</td>
<td><a href="/wiki/Warid_Pakistan" title="Warid Pakistan">Warid Pakistan</a></td>
<td>+92 32X YYYZZZZ
</td></tr>
<tr>
<td>33x</td>
<td><a href="/wiki/Ufone" title="Ufone">Ufone</a></td>
<td>+92 33X YYYZZZZ
</td></tr>
<tr>
<td>34x</td>
<td><a href="/wiki/Telenor" title="Telenor">Telenor</a></td>
<td>+92 34X YYYZZZZ
</td></tr>
<tr>
<td><a href="/wiki/Palau" title="Palau">Palau</a></td>
<td><a href="/wiki/%2B680" class="mw-redirect" title="+680">+680</a></td>
<td>??</td>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/State_of_Palestine" title="State of Palestine">Palestine, State of</a></td>
<td rowspan="2"><a href="/wiki/%2B970" class="mw-redirect" title="+970">+970</a> / <a href="/wiki/Telephone_numbers_in_Israel" title="Telephone numbers in Israel">+972</a></td>
<td>56</td>
<td rowspan="2">9</td>
<td><a href="/wiki/Wataniya" class="mw-redirect" title="Wataniya">Wataniya</a></td>
<td rowspan="2">Some countries use the code +972 of <a href="/wiki/Israel" title="Israel">Israel</a> for calling Palestine
</td></tr>
<tr>
<td>59</td>
<td><a href="/wiki/Jawwal" title="Jawwal">Jawwal</a>
</td></tr>
<tr>
<td><a href="/wiki/Panama" title="Panama">Panama</a></td>
<td><a href="/wiki/%2B507" class="mw-redirect" title="+507">+507</a></td>
<td>6</td>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Papua_New_Guinea" title="Papua New Guinea">Papua New Guinea</a></td>
<td rowspan="2"><a href="/wiki/%2B675" class="mw-redirect" title="+675">+675</a></td>
<td>68</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>69</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="15"><a href="/wiki/Paraguay" title="Paraguay">Paraguay</a>
</td>
<td rowspan="15"><a href="/wiki/%2B595" class="mw-redirect" title="+595">+595</a>
</td>
<td>961
</td>
<td rowspan="15">9
</td>
<td rowspan="2">VOX
</td>
<td rowspan="2">
</td></tr>
<tr>
<td>963
</td></tr>
<tr>
<td>971
</td>
<td rowspan="4">Personal
</td>
<td rowspan="4">
</td></tr>
<tr>
<td>972
</td></tr>
<tr>
<td>973
</td></tr>
<tr>
<td>975
</td></tr>
<tr>
<td>981</td>
<td rowspan="5">Tigo</td>
<td rowspan="5">First cellular operator in this country since 1991
</td></tr>
<tr>
<td>982
</td></tr>
<tr>
<td>983
</td></tr>
<tr>
<td>984
</td></tr>
<tr>
<td>985
</td></tr>
<tr>
<td>991
</td>
<td rowspan="4">Claro
</td>
<td rowspan="4">
</td></tr>
<tr>
<td>992
</td></tr>
<tr>
<td>993
</td></tr>
<tr>
<td>995
</td></tr>
<tr>
<td><a href="/wiki/Peru" title="Peru">Peru</a></td>
<td><a href="/wiki/%2B51" class="mw-redirect" title="+51">+51</a></td>
<td>9</td>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="41"><a href="/wiki/Philippines" title="Philippines">Philippines</a></td>
<td rowspan="41"><a href="/wiki/%2B63" class="mw-redirect" title="+63">+63</a></td>
<td>973</td>
<td rowspan="41">10</td>
<td rowspan="2"><a href="/wiki/Express_Telecom" title="Express Telecom">Express Telecom</a></td>
<td>
</td></tr>
<tr>
<td>974</td>
<td>
</td></tr>
<tr>
<td>905</td>
<td rowspan="11"><a href="/wiki/Globe_Telecom" title="Globe Telecom">Globe Telecom</a>, <a href="/wiki/Touch_Mobile" class="mw-redirect" title="Touch Mobile">Touch Mobile</a></td>
<td>
</td></tr>
<tr>
<td>906</td>
<td>
</td></tr>
<tr>
<td>977</td>
<td>
</td></tr>
<tr>
<td>915</td>
<td>
</td></tr>
<tr>
<td>916</td>
<td>
</td></tr>
<tr>
<td>926</td>
<td>
</td></tr>
<tr>
<td>927</td>
<td>
</td></tr>
<tr>
<td>935</td>
<td>
</td></tr>
<tr>
<td>936</td>
<td>
</td></tr>
<tr>
<td>937</td>
<td>
</td></tr>
<tr>
<td>996</td>
<td>
</td></tr>
<tr>
<td>997</td>
<td></td>
<td>
</td></tr>
<tr>
<td>917</td>
<td><a href="/wiki/Globe_Telecom" title="Globe Telecom">Globe Telecom</a></td>
<td>
</td></tr>
<tr>
<td>979</td>
<td>Next Mobile</td>
<td>
</td></tr>
<tr>
<td>920</td>
<td><a href="/wiki/Smart_Communications" title="Smart Communications">Smart Communications</a>, <a href="/wiki/Talk_%27N_Text" class="mw-redirect" title="Talk 'N Text">Talk 'N Text</a>, Addict Mobile</td>
<td>
</td></tr>
<tr>
<td>930</td>
<td rowspan="3"><a href="/wiki/Smart_Communications" title="Smart Communications">Smart Communications</a>, <a href="/wiki/Talk_%27N_Text" class="mw-redirect" title="Talk 'N Text">Talk 'N Text</a>, <a href="/wiki/Red_Mobile" title="Red Mobile">Red Mobile</a></td>
<td>
</td></tr>
<tr>
<td>938</td>
<td>
</td></tr>
<tr>
<td>939</td>
<td>
</td></tr>
<tr>
<td>907</td>
<td rowspan="12"><a href="/wiki/Smart_Communications" title="Smart Communications">Smart Communications</a>, <a href="/wiki/Talk_%27N_Text" class="mw-redirect" title="Talk 'N Text">Talk 'N Text</a></td>
<td>
</td></tr>
<tr>
<td>908</td>
<td>
</td></tr>
<tr>
<td>909</td>
<td>
</td></tr>
<tr>
<td>910</td>
<td>
</td></tr>
<tr>
<td>912</td>
<td>
</td></tr>
<tr>
<td>919</td>
<td>
</td></tr>
<tr>
<td>921</td>
<td>
</td></tr>
<tr>
<td>928</td>
<td>
</td></tr>
<tr>
<td>929</td>
<td>
</td></tr>
<tr>
<td>947</td>
<td>
</td></tr>
<tr>
<td>948</td>
<td>
</td></tr>
<tr>
<td>949</td>
<td>
</td></tr>
<tr>
<td>989</td>
<td></td>
<td>
</td></tr>
<tr>
<td>918</td>
<td><a href="/wiki/Smart_Communications" title="Smart Communications">Smart Communications</a></td>
<td>
</td></tr>
<tr>
<td>999</td>
<td><a href="/wiki/Smart_Communications" title="Smart Communications">Smart Communications</a>, <a href="/wiki/Red_Mobile" title="Red Mobile">Red Mobile</a></td>
<td>
</td></tr>
<tr>
<td>922</td>
<td rowspan="6"><a href="/wiki/Sun_Cellular" title="Sun Cellular">Sun Cellular</a></td>
<td>
</td></tr>
<tr>
<td>923</td>
<td>
</td></tr>
<tr>
<td>932</td>
<td>
</td></tr>
<tr>
<td>933</td>
<td>
</td></tr>
<tr>
<td>942</td>
<td>
</td></tr>
<tr>
<td>943</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Pitcairn_Islands" title="Pitcairn Islands">Pitcairn Islands</a></td>
<td>+64</td>
<td><a href="/wiki/Telephone_numbers_in_the_Pitcairn_Islands" title="Telephone numbers in the Pitcairn Islands">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#New_Zealand">New Zealand</a>
</td></tr>
<tr>
<td><a href="/wiki/Plazas_de_soberan%C3%ADa" title="Plazas de soberanía">Plazas de soberanía</a></td>
<td>+34</td>
<td><a href="/wiki/Telephone_numbers_in_Plazas_de_soberan%C3%ADa" class="mw-redirect" title="Telephone numbers in Plazas de soberanía">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Spain">Spain</a>
</td></tr>
<tr>
<td rowspan="13"><a href="/wiki/Poland" title="Poland">Poland</a></td>
<td rowspan="13"><a href="/wiki/%2B48" class="mw-redirect" title="+48">+48</a></td>
<td>50x</td>
<td rowspan="13">9</td>
<td rowspan="13"><a href="https://pl.wikipedia.org/wiki/Kategoria:Sieci_i_us%C5%82ugi_telefonii_kom%C3%B3rkowej" class="extiw" title="pl:Kategoria:Sieci i usługi telefonii komórkowej">Category grouping Polish cellular operators</a> on 2012-08-21 there are 4 leading companies: Polkomtel, T-Mobile, P4, PTK Centertel</td>
<td>
</td></tr>
<tr>
<td>45x</td>
<td>
</td></tr>
<tr>
<td>51x</td>
<td>
</td></tr>
<tr>
<td>53x</td>
<td>
</td></tr>
<tr>
<td>57x</td>
<td>
</td></tr>
<tr>
<td>60x</td>
<td>
</td></tr>
<tr>
<td>66x</td>
<td>
</td></tr>
<tr>
<td>69x</td>
<td>
</td></tr>
<tr>
<td>72x</td>
<td>
</td></tr>
<tr>
<td>73x</td>
<td>
</td></tr>
<tr>
<td>78x</td>
<td>
</td></tr>
<tr>
<td>79x</td>
<td>
</td></tr>
<tr>
<td>88x</td>
<td>
</td></tr>
<tr>
<td rowspan="14"><span class="anchor" id="Portugal"></span><a href="/wiki/Portugal" title="Portugal">Portugal</a></td>
<td rowspan="14"><a href="/wiki/%2B351" class="mw-redirect" title="+351">+351</a></td>
<td>91</td>
<td rowspan="14">9</td>
<td><a href="/wiki/Vodafone_Portugal" title="Vodafone Portugal">Vodafone</a></td>
<td>
</td></tr>
<tr>
<td>921</td>
<td><a href="/wiki/Vodafone_Portugal" title="Vodafone Portugal">Vodafone</a></td>
<td>
</td></tr>
<tr>
<td>922</td>
<td><a href="/wiki/CTT_Correios_de_Portugal,_S.A." title="CTT Correios de Portugal, S.A.">Phone-Ix</a> <i>(discontinued)</i></td>
<td>
</td></tr>
<tr>
<td>924</td>
<td rowspan="4"><a href="/wiki/Meo_(telecommunication_company)" class="mw-redirect" title="Meo (telecommunication company)">MEO</a></td>
<td>
</td></tr>
<tr>
<td>925</td>
<td>
</td></tr>
<tr>
<td>926</td>
<td>
</td></tr>
<tr>
<td>927</td>
<td>
</td></tr>
<tr>
<td>9290</td>
<td rowspan="5"><a href="/wiki/NOS_(Portuguese_company)" title="NOS (Portuguese company)">NOS</a></td>
<td>
</td></tr>
<tr>
<td>9291</td>
<td>
</td></tr>
<tr>
<td>9292</td>
<td>
</td></tr>
<tr>
<td>9293</td>
<td>
</td></tr>
<tr>
<td>9294</td>
<td>
</td></tr>
<tr>
<td>93</td>
<td><a href="/wiki/NOS_(Portuguese_company)" title="NOS (Portuguese company)">NOS</a></td>
<td>
</td></tr>
<tr>
<td>96</td>
<td><a href="/wiki/Meo_(telecommunication_company)" class="mw-redirect" title="Meo (telecommunication company)">MEO</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe" title="São Tomé and Príncipe">Príncipe</a></td>
<td><a href="/wiki/%2B239" class="mw-redirect" title="+239">+239</a></td>
<td>90</td>
<td>?</td>
<td></td>
<td>See <a href="#São_Tomé_and_Príncipe">São Tomé and Príncipe</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Puerto_Rico" title="Puerto Rico">Puerto Rico</a></td>
<td rowspan="2">+1</td>
<td><a href="/wiki/Area_code_787" class="mw-redirect" title="Area code 787">787</a></td>
<td rowspan="2">10</td>
<td></td>
<td rowspan="2">Mobile phones use geographic numbers that cannot be recognized as cell numbers.
</td></tr>
<tr>
<td><a href="/wiki/Area_code_939" class="mw-redirect" title="Area code 939">939</a></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Qatar" title="Qatar">Qatar</a></td>
<td rowspan="4"><a href="/wiki/%2B974" class="mw-redirect" title="+974">+974</a></td>
<td>33</td>
<td rowspan="4">8</td>
<td rowspan="3"><a href="/wiki/Qtel" class="mw-redirect" title="Qtel">Qtel</a></td>
<td>Format: +974 33XX-XXXX or 33XX-XXXX
</td></tr>
<tr>
<td>55</td>
<td>Format: +974 55XX-XXXX or 55XX-XXXX
</td></tr>
<tr>
<td>66</td>
<td>Format: +974 66XX-XXXX or 66XX-XXXX
</td></tr>
<tr>
<td>77</td>
<td><a href="/wiki/Vodafone" title="Vodafone">Vodafone</a></td>
<td>Format: +974 77XX-XXXX or 77XX-XXXX
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Réunion"></span><a href="/wiki/R%C3%A9union" title="Réunion">Réunion</a></td>
<td rowspan="2"><a href="/wiki/%2B262" class="mw-redirect" title="+262">+262</a></td>
<td>692 / 693</td>
<td>9</td>
<td></td>
<td>+262 692 xx xx xx or +262 693 xx xx xx
</td></tr>
<tr>
<td>700</td>
<td>12?</td>
<td></td>
<td>(NSN = 12 means +262 700 xxx xxx xxx)
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Romania" title="Romania">Romania</a></td>
<td rowspan="9"><a href="/wiki/%2B40" class="mw-redirect" title="+40">+40</a></td>
<td>70x</td>
<td rowspan="9">10<sup id="cite_ref-9" class="reference"><a href="#cite_note-9">[7]</a></sup></td>
<td>Reserved for virtual operators</td>
<td>
</td></tr>
<tr>
<td>711</td>
<td><a href="/wiki/Telekom_Romania" title="Telekom Romania">Telekom Romania</a></td>
<td>
</td></tr>
<tr>
<td>72x</td>
<td rowspan="2"><a href="/wiki/Vodafone_Romania" title="Vodafone Romania">Vodafone Romania</a></td>
<td>
</td></tr>
<tr>
<td>73x</td>
<td>
</td></tr>
<tr>
<td>74x</td>
<td rowspan="2"><a href="/wiki/Orange_Romania" title="Orange Romania">Orange Romania</a></td>
<td>
</td></tr>
<tr>
<td>75x</td>
<td>
</td></tr>
<tr>
<td>76x</td>
<td><a href="/wiki/Telekom_Romania" title="Telekom Romania">Telekom Romania</a></td>
<td>
</td></tr>
<tr>
<td>77x</td>
<td>DigiMobil (<a href="/wiki/RCS_%26_RDS" class="mw-redirect" title="RCS &amp; RDS">RCS &amp; RDS</a>)</td>
<td>
</td></tr>
<tr>
<td>78x</td>
<td><a href="/wiki/Zapp_Mobile" title="Zapp Mobile">Zapp Mobile</a> (merged with Telekom<sup id="cite_ref-zapp40_10-0" class="reference"><a href="#cite_note-zapp40-10">[8]</a></sup>)</td>
<td>
</td></tr>
<tr>
<td rowspan="19"><span class="anchor" id="Russia"></span><a href="/wiki/Russia" title="Russia">Russia</a> (Russian Federation)</td>
<td rowspan="19"><a href="/wiki/%2B7" title="+7">+7</a></td>
<td>901</td>
<td rowspan="19">10</td>
<td><a href="/w/index.php?title=Skylink_(Russia)&amp;action=edit&amp;redlink=1" class="new" title="Skylink (Russia) (page does not exist)">Skylink (Russia)</a></td>
<td>
</td></tr>
<tr>
<td>902</td>
<td><a href="/wiki/Tele2" title="Tele2">Tele2</a> (Russia) and regional operators</td>
<td>
</td></tr>
<tr>
<td>903</td>
<td><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a></td>
<td>
</td></tr>
<tr>
<td>904</td>
<td><a href="/wiki/Tele2" title="Tele2">Tele2</a> (Russia)</td>
<td>
</td></tr>
<tr>
<td>905</td>
<td rowspan="2"><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a></td>
<td>
</td></tr>
<tr>
<td>906</td>
<td>
</td></tr>
<tr>
<td>908</td>
<td><a href="/wiki/Tele2" title="Tele2">Tele2</a> (Russia)</td>
<td>
</td></tr>
<tr>
<td>909</td>
<td><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a></td>
<td>
</td></tr>
<tr>
<td>91x</td>
<td><a href="/wiki/Mobile_TeleSystems" class="mw-redirect" title="Mobile TeleSystems">MTS</a></td>
<td>
</td></tr>
<tr>
<td>92x</td>
<td rowspan="2"><a href="/wiki/Megafon" class="mw-redirect" title="Megafon">Megafon</a></td>
<td>
</td></tr>
<tr>
<td>93x</td>
<td>
</td></tr>
<tr>
<td>950</td>
<td><a href="/wiki/Tele2" title="Tele2">Tele2</a> (Russia)</td>
<td>
</td></tr>
<tr>
<td>951</td>
<td><a href="/wiki/Mobile_TeleSystems" class="mw-redirect" title="Mobile TeleSystems">MTS</a></td>
<td>
</td></tr>
<tr>
<td>952</td>
<td rowspan="2"><a href="/wiki/Tele2" title="Tele2">Tele2</a> (Russia)</td>
<td>
</td></tr>
<tr>
<td>953</td>
<td>
</td></tr>
<tr>
<td>96x</td>
<td rowspan="4"><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a></td>
<td>
</td></tr>
<tr>
<td>980</td>
<td>
</td></tr>
<tr>
<td>983</td>
<td>
</td></tr>
<tr>
<td>986</td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Rwanda" title="Rwanda">Rwanda</a></td>
<td rowspan="2"><a href="/wiki/%2B250" class="mw-redirect" title="+250">+250</a></td>
<td>07</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>08</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Saba" title="Saba">Saba</a></td>
<td><a href="/wiki/%2B599" class="mw-redirect" title="+599">+599</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>See <a href="#Curaçao_and_the_Caribbean_Netherlands">Curaçao and the Caribbean Netherlands</a>
</td></tr>

<tr>
<td><a href="/wiki/Saint_Barth%C3%A9lemy" title="Saint Barthélemy">Saint Barthélemy</a></td>
<td><a href="/wiki/%2B590" class="mw-redirect" title="+590">+590</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>See <a href="#Guadeloupe">Guadeloupe</a>
</td></tr>
<tr>
<td><span class="anchor" id="Saint_Helena_and_Tristan_da_Cunha"></span><a href="/wiki/Saint_Helena,_Ascension_and_Tristan_da_Cunha" title="Saint Helena, Ascension and Tristan da Cunha">Saint Helena and Tristan da Cunha</a> (not Ascenscion)</td>
<td><a href="/wiki/%2B290" class="mw-redirect" title="+290">+290</a></td>
<td>??</td>
<td>4</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Saint_Kitts_and_Nevis" title="Saint Kitts and Nevis">Saint Kitts and Nevis</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_869" title="Area code 869">869</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Saint_Lucia" title="Saint Lucia">Saint Lucia</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_758" title="Area code 758">758</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Collectivity_of_Saint_Martin" title="Collectivity of Saint Martin">Collectivity of Saint Martin</a></td>
<td><a href="/wiki/%2B590" class="mw-redirect" title="+590">+590</a></td>
<td>6</td>
<td>?</td>
<td></td>
<td>See <a href="#Guadeloupe">Guadeloupe</a>
</td></tr>
<tr>
<td><span class="anchor" id="Saint_Pierre_and_Miquelon"></span><a href="/wiki/Saint_Pierre_and_Miquelon" title="Saint Pierre and Miquelon">Saint Pierre and Miquelon</a></td>
<td><a href="/wiki/%2B508" class="mw-redirect" title="+508">+508</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Saint_Vincent_and_the_Grenadines" title="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_784" title="Area code 784">784</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Samoa" title="Samoa">Samoa</a></td>
<td><a href="/wiki/%2B685" class="mw-redirect" title="+685">+685</a></td>
<td>77</td>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/San_Marino" title="San Marino">San Marino</a></td>
<td><a href="/wiki/%2B378" class="mw-redirect" title="+378">+378</a></td>
<td>66</td>
<td>?</td>
<td><a href="/w/index.php?title=Prima_(San_Marino)&amp;action=edit&amp;redlink=1" class="new" title="Prima (San Marino) (page does not exist)">Prima</a></td>
<td>(see <a href="#Italy">Italy</a> for <a href="/w/index.php?title=Telefonia_Mobile_Sammarinese&amp;action=edit&amp;redlink=1" class="new" title="Telefonia Mobile Sammarinese (page does not exist)">TMS</a> customers)
</td></tr>
<tr>
<td><span class="anchor" id="São_Tomé_and_Príncipe"></span><a href="/wiki/S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe" title="São Tomé and Príncipe">São Tomé and Príncipe</a></td>
<td><a href="/wiki/%2B239" class="mw-redirect" title="+239">+239</a></td>
<td>90</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Saudi_Arabia" title="Saudi Arabia">Saudi Arabia</a></td>
<td rowspan="9"><a href="/wiki/%2B966" class="mw-redirect" title="+966">+966</a></td>
<td>50</td>
<td rowspan="9">9</td>
<td><a href="/wiki/Saudi_Telecom_Company" title="Saudi Telecom Company">STC</a></td>
<td>Example +966 50 000 0000 with country code is twelve digits / national number 050 000 0000 with 0 prefix is ten digits)
</td></tr>
<tr>
<td>51</td>
<td>Bravo</td>
<td>example +966510000000
</td></tr>
<tr>
<td>53</td>
<td><a href="/wiki/Saudi_Telecom_Company" title="Saudi Telecom Company">STC</a></td>
<td>example +966530000000
</td></tr>
<tr>
<td>54</td>
<td><a href="/wiki/Mobily" title="Mobily">mobily</a></td>
<td>example +966540000000
</td></tr>
<tr>
<td>55</td>
<td><a href="/wiki/Saudi_Telecom_Company" title="Saudi Telecom Company">STC</a></td>
<td>example +966550000000
</td></tr>
<tr>
<td>56</td>
<td><a href="/wiki/Mobily" title="Mobily">mobily</a></td>
<td>example +966560000000
</td></tr>
<tr>
<td>57</td>
<td>Bravo</td>
<td>example +966570000000 is new
</td></tr>
<tr>
<td>58</td>
<td rowspan="2"><a href="/wiki/Zain_Group" title="Zain Group">Zain</a></td>
<td>example +966580000000
</td></tr>
<tr>
<td>59</td>
<td>example +966590000000
</td></tr>
<tr>
<td><a href="/wiki/Scotland" title="Scotland">Scotland</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Senegal" title="Senegal">Senegal</a></td>
<td rowspan="2"><a href="/wiki/%2B221" class="mw-redirect" title="+221">+221</a></td>
<td>76</td>
<td rowspan="2">?</td>
<td>Senegal Mobile Tigo</td>
<td>
</td></tr>
<tr>
<td>77</td>
<td>Senegal Mobile Orange</td>
<td>
</td></tr>
<tr>
<td rowspan="10"><span class="anchor" id="Serbia"></span><a href="/wiki/Serbia" title="Serbia">Serbia</a></td>
<td rowspan="10"><a href="/wiki/%2B381" class="mw-redirect" title="+381">+381</a></td>
<td>60</td>
<td rowspan="9">9</td>
<td rowspan="2">Vip mobile</td>
<td>
</td></tr>
<tr>
<td>61</td>
<td>
</td></tr>
<tr>
<td>62</td>
<td rowspan="2"><a href="/wiki/Telenor_Serbia" title="Telenor Serbia">Telenor Serbia</a></td>
<td>
</td></tr>
<tr>
<td>63</td>
<td>
</td></tr>
<tr>
<td>64</td>
<td rowspan="3"><a href="/wiki/Mobile_Telephony_of_Serbia" class="mw-redirect" title="Mobile Telephony of Serbia">mt:s</a></td>
<td>
</td></tr>
<tr>
<td>65</td>
<td>
</td></tr>
<tr>
<td>66</td>
<td>
</td></tr>
<tr>
<td>677</td>
<td><a href="/wiki/Mobile_Telephony_of_Serbia" class="mw-redirect" title="Mobile Telephony of Serbia">Globaltel</a></td>
<td>
</td></tr>
<tr>
<td>68</td>
<td><a href="/wiki/Vip_mobile" class="mw-redirect" title="Vip mobile">Vip mobile</a></td>
<td>
</td></tr>
<tr>
<td>69</td>
<td>8</td>
<td><a href="/wiki/Telenor_Serbia" title="Telenor Serbia">Telenor Serbia</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Seychelles" title="Seychelles">Seychelles</a></td>
<td rowspan="2"><a href="/wiki/%2B248" class="mw-redirect" title="+248">+248</a></td>
<td>5</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="4"><a href="/wiki/Sierra_Leone" title="Sierra Leone">Sierra Leone</a></td>
<td rowspan="4"><a href="/wiki/%2B232" class="mw-redirect" title="+232">+232</a></td>
<td>23</td>
<td rowspan="4">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>30</td>
<td></td>
<td>
</td></tr>
<tr>
<td>33</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7x</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Singapore" title="Singapore">Singapore</a></td>
<td rowspan="2"><a href="/wiki/%2B65" class="mw-redirect" title="+65">+65</a></td>
<td>8</td>
<td rowspan="2">8</td>
<td></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Sint_Eustatius" title="Sint Eustatius">Sint Eustatius</a></td>
<td><a href="/wiki/%2B599" class="mw-redirect" title="+599">+599</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>See <a href="#Curaçao_and_the_Caribbean_Netherlands">Curaçao and the Caribbean Netherlands</a>
</td></tr>
<tr>
<td><a href="/wiki/Sint_Maarten" title="Sint Maarten">Sint Maarten</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_721" title="Area code 721">721</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td rowspan="22"><a href="/wiki/Slovakia" title="Slovakia">Slovakia</a> (Slovak Republic)</td>
<td rowspan="22"><a href="/wiki/%2B421" class="mw-redirect" title="+421">+421</a></td>
<td>901</td>
<td rowspan="22">9</td>
<td rowspan="4"><a href="/wiki/T-Mobile" title="T-Mobile">T-Mobile</a></td>
<td>
</td></tr>
<tr>
<td>902</td>
<td>
</td></tr>
<tr>
<td>903</td>
<td>
</td></tr>
<tr>
<td>904</td>
<td>
</td></tr>
<tr>
<td>905</td>
<td rowspan="4"><a href="/wiki/Orange_Slovensko" title="Orange Slovensko">Orange</a></td>
<td>
</td></tr>
<tr>
<td>906</td>
<td>
</td></tr>
<tr>
<td>907</td>
<td>
</td></tr>
<tr>
<td>908</td>
<td>
</td></tr>
<tr>
<td>910</td>
<td rowspan="4"><a href="/wiki/T-Mobile" title="T-Mobile">T-Mobile</a></td>
<td>
</td></tr>
<tr>
<td>911</td>
<td>
</td></tr>
<tr>
<td>912</td>
<td>
</td></tr>
<tr>
<td>914</td>
<td>
</td></tr>
<tr>
<td>915</td>
<td rowspan="4"><a href="/wiki/Orange_Slovensko" title="Orange Slovensko">Orange</a></td>
<td>
</td></tr>
<tr>
<td>916</td>
<td>
</td></tr>
<tr>
<td>917</td>
<td>
</td></tr>
<tr>
<td>918</td>
<td>
</td></tr>
<tr>
<td>940</td>
<td rowspan="4"><a href="/wiki/Telef%C3%B3nica_Slovakia" class="mw-redirect" title="Telefónica Slovakia">O<sub>2</sub></a></td>
<td>
</td></tr>
<tr>
<td>944</td>
<td>
</td></tr>
<tr>
<td>948</td>
<td>
</td></tr>
<tr>
<td>949</td>
<td>
</td></tr>
<tr>
<td>950</td>
<td><a href="/w/index.php?title=SWAN,_A.S.&amp;action=edit&amp;redlink=1" class="new" title="SWAN, A.S. (page does not exist)">SWAN</a></td>
<td>
</td></tr>
<tr>
<td>951</td>
<td><a href="/w/index.php?title=SWAN,_A.S.&amp;action=edit&amp;redlink=1" class="new" title="SWAN, A.S. (page does not exist)">SWAN</a></td>
<td>
</td></tr>
<tr>
<td rowspan="14"><span class="anchor" id="Slovenia"></span><a href="/wiki/Slovenia" title="Slovenia">Slovenia</a></td>
<td rowspan="14"><a href="/wiki/%2B386" class="mw-redirect" title="+386">+386</a></td>
<td>20</td>
<td rowspan="14">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>21</td>
<td></td>
<td>
</td></tr>
<tr>
<td>30</td>
<td><a href="/wiki/Si.mobil" class="mw-redirect" title="Si.mobil">Si.mobil</a></td>
<td>
</td></tr>
<tr>
<td>31</td>
<td><a href="/wiki/Mobitel_(Slovenia)" title="Mobitel (Slovenia)">Mobitel</a></td>
<td>
</td></tr>
<tr>
<td>40</td>
<td><a href="/wiki/Si.mobil" class="mw-redirect" title="Si.mobil">Si.mobil</a></td>
<td>
</td></tr>
<tr>
<td>41</td>
<td rowspan="2"><a href="/wiki/Mobitel_(Slovenia)" title="Mobitel (Slovenia)">Mobitel</a></td>
<td>
</td></tr>
<tr>
<td>49</td>
<td>
</td></tr>
<tr>
<td>50</td>
<td></td>
<td>
</td></tr>
<tr>
<td>51</td>
<td><a href="/wiki/Mobitel_(Slovenia)" title="Mobitel (Slovenia)">Mobitel</a></td>
<td>
</td></tr>
<tr>
<td>60</td>
<td></td>
<td>
</td></tr>
<tr>
<td>61</td>
<td></td>
<td>
</td></tr>
<tr>
<td>64</td>
<td><a href="/wiki/T-2_(ISP)" title="T-2 (ISP)">T-2</a></td>
<td>
</td></tr>
<tr>
<td>70</td>
<td><a href="/w/index.php?title=Telemach_Mobile&amp;action=edit&amp;redlink=1" class="new" title="Telemach Mobile (page does not exist)">Telemach Mobile</a></td>
<td>
</td></tr>
<tr>
<td>71</td>
<td><a href="/wiki/Mobitel_(Slovenia)" title="Mobitel (Slovenia)">Mobitel</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Solomon_Islands" title="Solomon Islands">Solomon Islands</a></td>
<td rowspan="2"><a href="/wiki/%2B677" class="mw-redirect" title="+677">+677</a></td>
<td>74</td>
<td rowspan="2">7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>75</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Somalia" title="Somalia">Somalia</a></td>
<td><a href="/wiki/%2B252" class="mw-redirect" title="+252">+252</a></td>
<td>??</td>
<td>7 or 8</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="25"><a href="/wiki/South_Africa" title="South Africa">South Africa</a></td>
<td rowspan="25"><a href="/wiki/%2B27" class="mw-redirect" title="+27">+27</a></td>
<td>60</td>
<td rowspan="25">9</td>
<td rowspan="2"><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>710</td>
<td>
</td></tr>
<tr>
<td>711</td>
<td rowspan="6"><a href="/wiki/Vodacom" title="Vodacom">Vodacom</a></td>
<td>
</td></tr>
<tr>
<td>712</td>
<td>
</td></tr>
<tr>
<td>713</td>
<td>
</td></tr>
<tr>
<td>714</td>
<td>
</td></tr>
<tr>
<td>715</td>
<td>
</td></tr>
<tr>
<td>716</td>
<td>
</td></tr>
<tr>
<td>717</td>
<td rowspan="3"><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>718</td>
<td>
</td></tr>
<tr>
<td>719</td>
<td>
</td></tr>
<tr>
<td>72</td>
<td><a href="/wiki/Vodacom" title="Vodacom">Vodacom</a></td>
<td>
</td></tr>
<tr>
<td>73</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>74</td>
<td><a href="/wiki/Cell_C" title="Cell C">Cell C</a></td>
<td>
</td></tr>
<tr>
<td>741</td>
<td><a href="/wiki/Virgin_Mobile" title="Virgin Mobile">Virgin Mobile</a></td>
<td>
</td></tr>
<tr>
<td>76</td>
<td><a href="/wiki/Vodacom" title="Vodacom">Vodacom</a></td>
<td>
</td></tr>
<tr>
<td>78</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>79</td>
<td><a href="/wiki/Vodacom" title="Vodacom">Vodacom</a></td>
<td>
</td></tr>
<tr>
<td>811</td>
<td rowspan="4"><a href="/w/index.php?title=Telkom_Mobile_(Former_8ta)&amp;action=edit&amp;redlink=1" class="new" title="Telkom Mobile (Former 8ta) (page does not exist)">Telkom Mobile (Former 8ta)</a></td>
<td>
</td></tr>
<tr>
<td>812</td>
<td>
</td></tr>
<tr>
<td>813</td>
<td>
</td></tr>
<tr>
<td>814</td>
<td>
</td></tr>
<tr>
<td>82</td>
<td><a href="/wiki/Vodacom" title="Vodacom">Vodacom</a></td>
<td>
</td></tr>
<tr>
<td>83</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>84</td>
<td><a href="/wiki/Cell_C" title="Cell C">Cell C</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/South_Georgia_and_the_South_Sandwich_Islands" title="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</a></td>
<td>+500</td>
<td><a href="/wiki/Telephone_numbers_in_South_Georgia_and_the_South_Sandwich_Islands" title="Telephone numbers in South Georgia and the South Sandwich Islands">??</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Falkland_Islands">Falkland Islands</a>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/South_Korea" title="South Korea">South Korea</a></td>
<td rowspan="6"><a href="/wiki/%2B82" class="mw-redirect" title="+82">+82</a></td>
<td>10</td>
<td>10</td>
<td>All carrier (From Jan 1, 2004)</td>
<td>+82 10 NXXX-XXXX<br>
<p>+82 10 0XX-XXXX for satellite phone
</p>
</td></tr>
<tr>
<td>11</td>
<td rowspan="2">9~10</td>
<td>SK Telecom (until Dec 31, 2003)
<p>All Carrier (exising subscribers, from Jan 1, 2004) 
</p>
</td>
<td>+82 11 NXX-XXXX<br>
<p>+82 11 9XXX-XXXX
</p>
</td></tr>
<tr>
<td>16</td>
<td>KT (until Dec 31, 2003)
<p>All Carrier (exising subscribers, from Jan 1, 2004) 
</p>
</td>
<td>+82 16 NXX-XXXX<br>
<p>+82 16 9XXX-XXXX
</p>
</td></tr>
<tr>
<td>17</td>
<td rowspan="2">9</td>
<td></td>
<td>+82 17 NXX-XXXX
</td></tr>
<tr>
<td>18</td>
<td></td>
<td>+82 18 NXX-XXXX
</td></tr>
<tr>
<td>19</td>
<td>9~10</td>
<td>LG U+ (until Dec 31, 2004)
<p>All Carrier (exising subscribers, from Jan 1, 2005)
</p>
</td>
<td>+82 19 NXX-XXXX<br>
<p>+82 19 9XXX-XXXX
</p>
</td></tr>
<tr>
<td><a href="/wiki/South_Ossetia" title="South Ossetia">South Ossetia</a></td>
<td>+995</td>
<td><a href="/wiki/Telephone_numbers_in_South_Ossetia" title="Telephone numbers in South Ossetia">34x</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Georgia">Georgia</a>
</td></tr>
<tr>
<td><a href="/wiki/South_Sudan" title="South Sudan">South Sudan</a></td>
<td><a href="/wiki/%2B211" class="mw-redirect" title="+211">+211</a></td>
<td>9x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><span class="anchor" id="Spain"></span><a href="/wiki/Spain" title="Spain">Spain</a></td>
<td rowspan="2"><a href="/wiki/%2B34" class="mw-redirect" title="+34">+34</a></td>
<td>6</td>
<td rowspan="2">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Sri_Lanka" title="Sri Lanka">Sri Lanka</a></td>
<td rowspan="8"><a href="/wiki/%2B94" class="mw-redirect" title="+94">+94</a></td>
<td>70</td>
<td rowspan="8">7</td>
<td rowspan="2"><a href="/wiki/Mobitel_(Sri_Lanka)" class="mw-redirect" title="Mobitel (Sri Lanka)">Mobitel</a></td>
<td rowspan="2"><a rel="nofollow" class="external free" href="http://www.mobitel.lk/">http://www.mobitel.lk/</a>
</td></tr>
<tr>
<td>71
</td></tr>
<tr>
<td>72</td>
<td><a href="/wiki/Hutch_(Sri_Lanka)" title="Hutch (Sri Lanka)">Hutch</a> <small>*(previously used by <a href="/wiki/Etisalat_(Sri_Lanka)" title="Etisalat (Sri Lanka)">Etisalat</a>)</small><sup id="cite_ref-Hutch-Etisalat_11-0" class="reference"><a href="#cite_note-Hutch-Etisalat-11">[9]</a></sup></td>
<td><a rel="nofollow" class="external free" href="https://www.hutch.lk">https://www.hutch.lk</a>
</td></tr>
<tr>
<td>74
</td>
<td><a href="/wiki/Dialog_Axiata" title="Dialog Axiata">Dialog</a>
</td>
<td><a rel="nofollow" class="external free" href="https://www.dialog.lk/">https://www.dialog.lk/</a>
</td></tr>
<tr>
<td>75</td>
<td><a href="/wiki/Airtel_Sri_Lanka" title="Airtel Sri Lanka">Airtel</a></td>
<td><a rel="nofollow" class="external free" href="https://www.airtel.lk/">https://www.airtel.lk/</a>
</td></tr>
<tr>
<td>76</td>
<td rowspan="2"><a href="/wiki/Dialog_Axiata" title="Dialog Axiata">Dialog</a></td>
<td rowspan="2"><a rel="nofollow" class="external free" href="https://www.dialog.lk/">https://www.dialog.lk/</a>
</td></tr>
<tr>
<td>77
</td></tr>
<tr>
<td>78</td>
<td><a href="/wiki/Hutch_(Sri_Lanka)" title="Hutch (Sri Lanka)">Hutch</a></td>
<td><a rel="nofollow" class="external free" href="https://www.hutch.lk">https://www.hutch.lk</a>
</td></tr>
<tr>
<td><a href="/wiki/Sudan" title="Sudan">Sudan</a></td>
<td><a href="/wiki/%2B249" class="mw-redirect" title="+249">+249</a></td>
<td>9</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Suriname" title="Suriname">Suriname</a></td>
<td><a href="/wiki/%2B597" class="mw-redirect" title="+597">+597</a></td>
<td>8</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Svalbard"></span><a href="/wiki/Svalbard" title="Svalbard">Svalbard</a></td>
<td>+47</td>
<td><a href="/wiki/Telephone_numbers_in_Svalbard" title="Telephone numbers in Svalbard">79</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Norway">Norway</a>
</td></tr>
<tr>
<td rowspan="43"><a href="/wiki/Sweden" title="Sweden">Sweden</a></td>
<td rowspan="43"><a href="/wiki/%2B46" class="mw-redirect" title="+46">+46</a></td>
<td>70</td>
<td>7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>71 0
</td>
<td>10
</td>
<td>
</td>
<td>
</td></tr>
<tr>
<td>72</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>73 00</td>
<td rowspan="38">7</td>
<td>TeliaSonera Sv. AB</td>
<td>
</td></tr>
<tr>
<td>73 01</td>
<td>Wireless Maingate N</td>
<td>
</td></tr>
<tr>
<td>73 02 - 09</td>
<td>TeliaSonera Sv. AB</td>
<td>
</td></tr>
<tr>
<td>73 10</td>
<td>Timepiece Servicos</td>
<td>
</td></tr>
<tr>
<td>73 11</td>
<td>Wireless Maingate N</td>
<td>
</td></tr>
<tr>
<td>73 12</td>
<td>Ledig</td>
<td>
</td></tr>
<tr>
<td>73 13</td>
<td>Wireless Maingate M</td>
<td>
</td></tr>
<tr>
<td>73 14 - 15</td>
<td>Campuz Mobile AB</td>
<td>
</td></tr>
<tr>
<td>73 16</td>
<td>Abbla Mobile Sv. AB</td>
<td>
</td></tr>
<tr>
<td>73 170</td>
<td>Netnet AS</td>
<td>
</td></tr>
<tr>
<td>73 171 - 179</td>
<td>Ledig</td>
<td>
</td></tr>
<tr>
<td>73 18</td>
<td>ACN Communications S</td>
<td>
</td></tr>
<tr>
<td>73 19</td>
<td>Terraflex Europe LPP</td>
<td>
</td></tr>
<tr>
<td>73 20</td>
<td>Telenor Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 21 - 22</td>
<td>Optimal Telecom Sver</td>
<td>
</td></tr>
<tr>
<td>73 23</td>
<td>Telenor Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 24 - 26</td>
<td>Telenor Mobile Sv.</td>
<td>
</td></tr>
<tr>
<td>73 27</td>
<td>Ventelo Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 28</td>
<td>Chess AB</td>
<td>
</td></tr>
<tr>
<td>73 29</td>
<td>Telogic ApS</td>
<td>
</td></tr>
<tr>
<td>73 3</td>
<td rowspan="2">Telenor Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 40 - 44</td>
<td>
</td></tr>
<tr>
<td>73 450 - 454</td>
<td>Telogic ApS</td>
<td>
</td></tr>
<tr>
<td>73 455</td>
<td>Ledig</td>
<td>
</td></tr>
<tr>
<td>73 456</td>
<td>Intelligent Appl. AB</td>
<td>
</td></tr>
<tr>
<td>73 457 - 459</td>
<td rowspan="2">Ledig</td>
<td>
</td></tr>
<tr>
<td>73 46 - 49</td>
<td>
</td></tr>
<tr>
<td>73 50 - 54</td>
<td>Hi3G Access AB</td>
<td>
</td></tr>
<tr>
<td>73 55 - 59</td>
<td rowspan="3">Tele2 Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 6</td>
<td>
</td></tr>
<tr>
<td>73 70 - 79</td>
<td>
</td></tr>
<tr>
<td>73 80 - 84</td>
<td>TeliaSonera Sv. AB</td>
<td>
</td></tr>
<tr>
<td>73 85</td>
<td>Telenor Sverige AB</td>
<td>
</td></tr>
<tr>
<td>73 86</td>
<td>Lebara Ltd.</td>
<td>
</td></tr>
<tr>
<td>73 87</td>
<td>Ledig</td>
<td>
</td></tr>
<tr>
<td>73 88</td>
<td>Newphone SP AB</td>
<td>
</td></tr>
<tr>
<td>73 89</td>
<td>Ledig</td>
<td>
</td></tr>
<tr>
<td>73 9</td>
<td>Tele2 Sverige AB</td>
<td>
</td></tr>
<tr>
<td>76</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>79</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Switzerland" title="Switzerland">Switzerland</a></td>
<td rowspan="6"><a href="/wiki/%2B41" class="mw-redirect" title="+41">+41</a></td>
<td>74</td>
<td rowspan="6">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>75</td>
<td><a href="/wiki/Swisscom" title="Swisscom">Swisscom</a> (second mobile dialling code)</td>
<td rowspan="5">Be advised that other operators can use these indexes, as long as they use network nodes of this three operators.
</td></tr>
<tr>
<td>76</td>
<td><a href="/wiki/TDC_A/S" title="TDC A/S">Sunrise (TDC Switzerland)</a>
</td></tr>
<tr>
<td>77</td>
<td><a href="/wiki/Swisscom" title="Swisscom">Swisscom</a> Used by <a href="/wiki/Migros" title="Migros">Migros</a>
</td></tr>
<tr>
<td>78</td>
<td><a href="/wiki/Iliad_SA" title="Iliad SA">Salt Mobile</a> (formerly Orange Switzeland)
</td></tr>
<tr>
<td>79</td>
<td><a href="/wiki/Swisscom" title="Swisscom">Swisscom</a>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Syria" title="Syria">Syria</a></td>
<td rowspan="6"><a href="/wiki/%2B963" class="mw-redirect" title="+963">+963</a></td>
<td>93</td>
<td rowspan="6">9
</td>
<td rowspan="3">Syriatel</td>
<td>
</td></tr>
<tr>
<td>98
</td>
<td>
</td></tr>
<tr>
<td>99
</td>
<td>
</td></tr>
<tr>
<td>94
</td>
<td rowspan="3">MTN
</td>
<td>
</td></tr>
<tr>
<td>95
</td>
<td>
</td></tr>
<tr>
<td>96</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Taiwan" title="Taiwan">Taiwan</a></td>
<td><a href="/wiki/%2B886" class="mw-redirect" title="+886">+886</a></td>
<td>9</td>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="18"><a href="/wiki/Tajikistan" title="Tajikistan">Tajikistan</a></td>
<td rowspan="18"><a href="/wiki/%2B992" class="mw-redirect" title="+992">+992</a></td>
<td>9</td>
<td rowspan="18">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>90</td>
<td><a href="/w/index.php?title=MLT_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="MLT GSM/3G (page does not exist)">MLT GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>910</td>
<td rowspan="8"><a href="/w/index.php?title=Beeline-TJ_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="Beeline-TJ GSM/3G (page does not exist)">Beeline-TJ GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>911</td>
<td>
</td></tr>
<tr>
<td>912</td>
<td>
</td></tr>
<tr>
<td>913</td>
<td>
</td></tr>
<tr>
<td>914</td>
<td>
</td></tr>
<tr>
<td>915</td>
<td>
</td></tr>
<tr>
<td>916</td>
<td>
</td></tr>
<tr>
<td>917</td>
<td>
</td></tr>
<tr>
<td>918</td>
<td><a href="/w/index.php?title=Babilon-Mobile_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="Babilon-Mobile GSM/3G (page does not exist)">Babilon-Mobile GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>919</td>
<td><a href="/w/index.php?title=Beeline-TJ_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="Beeline-TJ GSM/3G (page does not exist)">Beeline-TJ GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td><a href="/w/index.php?title=TCell-Somoncom_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="TCell-Somoncom GSM/3G (page does not exist)">TCell-Somoncom GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td><a href="/w/index.php?title=TCell-Tajikistan_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="TCell-Tajikistan GSM/3G (page does not exist)">TCell-Tajikistan GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td><a href="/w/index.php?title=TK-Mobile_CDMA&amp;action=edit&amp;redlink=1" class="new" title="TK-Mobile CDMA (page does not exist)">TK-Mobile CDMA</a></td>
<td>
</td></tr>
<tr>
<td>96</td>
<td><a href="/w/index.php?title=M.Teko_CDMA&amp;action=edit&amp;redlink=1" class="new" title="M.Teko CDMA (page does not exist)">M.Teko CDMA</a></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td><a href="/w/index.php?title=Skytel_CDMA&amp;action=edit&amp;redlink=1" class="new" title="Skytel CDMA (page does not exist)">Skytel CDMA</a></td>
<td>
</td></tr>
<tr>
<td>98</td>
<td><a href="/w/index.php?title=Babilon-Mobile_GSM/3G&amp;action=edit&amp;redlink=1" class="new" title="Babilon-Mobile GSM/3G (page does not exist)">Babilon-Mobile GSM/3G</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Tanzania" title="Tanzania">Tanzania</a></td>
<td><a href="/wiki/%2B255" class="mw-redirect" title="+255">+255</a></td>
<td>74x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Thailand" title="Thailand">Thailand</a></td>
<td rowspan="3"><a href="/wiki/%2B66" class="mw-redirect" title="+66">+66</a></td>
<td>6</td>
<td rowspan="3">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>8</td>
<td></td>
<td>
</td></tr>
<tr>
<td>9</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Togo" title="Togo">Togo</a></td>
<td rowspan="6"><a href="/wiki/%2B228" class="mw-redirect" title="+228">+228</a></td>
<td>90</td>
<td rowspan="6">8</td>
<td rowspan="3">Togocel</td>
<td>
</td></tr>
<tr>
<td>91</td>
<td>
</td></tr>
<tr>
<td>92</td>
<td>
</td></tr>
<tr>
<td>97</td>
<td rowspan="3">Moov Togo</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td>
</td></tr>
<tr>
<td>99</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Tokelau" title="Tokelau">Tokelau</a></td>
<td><a href="/wiki/%2B690" class="mw-redirect" title="+690">+690</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Tonga" title="Tonga">Tonga</a></td>
<td rowspan="8"><a href="/wiki/%2B676" class="mw-redirect" title="+676">+676</a></td>
<td>15</td>
<td rowspan="8">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>16</td>
<td></td>
<td>
</td></tr>
<tr>
<td>17</td>
<td></td>
<td>
</td></tr>
<tr>
<td>18</td>
<td></td>
<td>
</td></tr>
<tr>
<td>19</td>
<td></td>
<td>
</td></tr>
<tr>
<td>87</td>
<td></td>
<td>
</td></tr>
<tr>
<td>88</td>
<td></td>
<td>
</td></tr>
<tr>
<td>89</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Trinidad_and_Tobago" title="Trinidad and Tobago">Trinidad and Tobago</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_868" title="Area code 868">868</a></td>
<td>10</td>
<td>Trinidad and Tobago Cellular</td>
<td>+1-868-620, +1-868-678,<br>+1-868-700 to +1-868-799,<br>+1-868-680 to +1-868-689
</td></tr>
<tr>
<td><a href="/wiki/Tristan_da_Cunha" title="Tristan da Cunha">Tristan da Cunha</a></td>
<td>+290</td>
<td><a href="/wiki/Telephone_numbers_in_Tristan_da_Cunha" class="mw-redirect" title="Telephone numbers in Tristan da Cunha">8</a></td>
<td>?</td>
<td></td>
<td>See <a href="#Saint_Helena_and_Tristan_da_Cunha">Saint Helena and Tristan da Cunha</a>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Tunisia" title="Tunisia">Tunisia</a></td>
<td rowspan="5"><a href="/wiki/%2B216" class="mw-redirect" title="+216">+216</a></td>
<td>2</td>
<td rowspan="5">8</td>
<td>Tunisia Mobile Ooredoo</td>
<td>
</td></tr>
<tr>
<td>3</td>
<td>Tunisia Mobile Orange</td>
<td>
</td></tr>
<tr>
<td>4</td>
<td>Tunisia Mobile Tuntel</td>
<td>
</td></tr>
<tr>
<td>5</td>
<td>Tunisia Mobile Orange</td>
<td>
</td></tr>
<tr>
<td>9</td>
<td>Tunisia Mobile Tuntel</td>
<td>
</td></tr>
<tr>
<td rowspan="4"><span class="anchor" id="Turkey"></span><a href="/wiki/Turkey" title="Turkey">Turkey</a></td>
<td rowspan="4"><a href="/wiki/%2B90" class="mw-redirect" title="+90">+90</a></td>
<td>50</td>
<td rowspan="4">11</td>
<td><a href="/wiki/Avea" class="mw-redirect" title="Avea">Avea</a></td>
<td>Format: +90 50X-XXXXXX or 050X-XXX-XXX
</td></tr>
<tr>
<td>53</td>
<td><a href="/wiki/Turkcell" title="Turkcell">Turkcell</a></td>
<td>Format: +90 53X-XXXXXX or 053X-XXX-XXX
</td></tr>
<tr>
<td>54</td>
<td><a href="/wiki/Vodafone_Turkey" title="Vodafone Turkey">Vodafone Turkey</a></td>
<td>Format: +90 54X-XXXXXX or 054X-XXX-XXX
</td></tr>
<tr>
<td>55</td>
<td><a href="/wiki/Avea" class="mw-redirect" title="Avea">Avea</a></td>
<td>Format: +90 55X-XXXXXX or 055X-XXX-XXX
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Turkmenistan" title="Turkmenistan">Turkmenistan</a></td>
<td rowspan="3"><a href="/wiki/%2B993" class="mw-redirect" title="+993">+993</a></td>
<td>65</td>
<td rowspan="3">?</td>
<td>TMCELL</td>
<td>
</td></tr>
<tr>
<td>66</td>
<td>BCTI (MTS)</td>
<td>
</td></tr>
<tr>
<td>67</td>
<td>BCTI (MTS)</td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Turks_and_Caicos_Islands" title="Turks and Caicos Islands">Turks and Caicos Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_649" title="Area code 649">649</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td><a href="/wiki/Tuvalu" title="Tuvalu">Tuvalu</a></td>
<td><a href="/wiki/%2B688" class="mw-redirect" title="+688">+688</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="9"><a href="/wiki/Uganda" title="Uganda">Uganda</a><sup id="cite_ref-12" class="reference"><a href="#cite_note-12">[10]</a></sup></td>
<td rowspan="9"><a href="/wiki/%2B256" class="mw-redirect" title="+256">+256</a></td>
<td>2,3,4</td>
<td></td>
<td>fixed telephone services</td>
<td>
</td></tr>
<tr>
<td>720</td>
<td></td>
<td>Smile Communications (U) Limited</td>
<td>
</td></tr>
<tr>
<td>730</td>
<td></td>
<td>K2 Telecom</td>
<td></td>
<td>
</td></tr>
<tr>
<td>740 –744</td>
<td></td>
<td>Sure Telcom Uganda Limited</td>
<td>
</td></tr>
<tr>
<td>750 –759</td>
<td></td>
<td>Airtel Uganda Limited</td>
<td>
</td></tr>
<tr>
<td>760 –764</td>
<td></td>
<td>iTel Limited</td>
<td>
</td></tr>
<tr>
<td>770 –779</td>
<td></td>
<td>MTN Uganda Limited</td>
<td>
</td></tr>
<tr>
<td>780 –789</td>
<td></td>
<td>MTN Uganda Limited</td>
<td>
</td></tr>
<tr>
<td>790 –794</td>
<td></td>
<td>Orange Uganda Limited</td>
<td>
</td></tr>
<tr>
<td rowspan="15"><a href="/wiki/Ukraine" title="Ukraine">Ukraine</a></td>
<td rowspan="15"><a href="/wiki/%2B380" class="mw-redirect" title="+380">+380</a></td>
<td>39</td>
<td rowspan="15">9</td>
<td><a href="/wiki/Golden_Telecom#Golden_Telecom_LLC_(Ukraine)" title="Golden Telecom">Golden Telecom</a></td>
<td>
</td></tr>
<tr>
<td>50</td>
<td><a href="/wiki/Vodafone_Ukraine" title="Vodafone Ukraine">Vodafone Ukraine</a></td>
<td>
</td></tr>
<tr>
<td>63</td>
<td><a href="/wiki/Lifecell" title="Lifecell">Lifecell (Astelit)</a></td>
<td>
</td></tr>
<tr>
<td>66</td>
<td><a href="/wiki/MTS_Ukraine" class="mw-redirect" title="MTS Ukraine">Vodafone Ukraine</a></td>
<td>
</td></tr>
<tr>
<td>67</td>
<td><a href="/wiki/Kyivstar" title="Kyivstar">Kyivstar</a></td>
<td>
</td></tr>
<tr>
<td>68</td>
<td><a href="/wiki/Beeline_(telecommunications)#Ukraine" class="mw-redirect" title="Beeline (telecommunications)">Beeline</a></td>
<td>
</td></tr>
<tr>
<td>91</td>
<td><a href="/wiki/Utel_(telecommunications)" class="mw-redirect" title="Utel (telecommunications)">UTEL</a></td>
<td>
</td></tr>
<tr>
<td>92</td>
<td><a href="/wiki/PEOPLEnet" title="PEOPLEnet">PEOPLEnet</a></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td><a href="/wiki/Lifecell" title="Lifecell">Lifecell (Astelit)</a></td>
<td>
</td></tr>
<tr>
<td>94</td>
<td><a href="/w/index.php?title=Intertelecom_Ukraine&amp;action=edit&amp;redlink=1" class="new" title="Intertelecom Ukraine (page does not exist)">Intertelecom</a></td>
<td>
</td></tr>
<tr>
<td>95</td>
<td><a href="/wiki/Vodafone_Ukraine" title="Vodafone Ukraine">Vodafone Ukraine</a></td>
<td>
</td></tr>
<tr>
<td>96</td>
<td rowspan="3"><a href="/wiki/Kyivstar" title="Kyivstar">Kyivstar</a></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td>
</td></tr>
<tr>
<td>99</td>
<td><a href="/wiki/Vodafone_Ukraine" title="Vodafone Ukraine">Vodafone Ukraine</a></td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/United_Arab_Emirates" title="United Arab Emirates">United Arab Emirates</a></td>
<td rowspan="6"><a href="/wiki/%2B971" class="mw-redirect" title="+971">+971</a></td>
<td>50</td>
<td rowspan="6">9</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a></td>
<td>example +971 500 000 000 with country code is 12 digits
</td></tr>
<tr>
<td>52</td>
<td><a href="/wiki/Du_(telco)" class="mw-redirect" title="Du (telco)">Du</a></td>
<td>example +971 520 000 000 with country code is 12 digits
</td></tr>
<tr>
<td>54</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a></td>
<td>example +971 540 000 000 with country code is 12 digits
</td></tr>
<tr>
<td>55</td>
<td><a href="/wiki/Du_(telco)" class="mw-redirect" title="Du (telco)">Du</a></td>
<td>example +971 550 000 000 with country code is 12 digits
</td></tr>
<tr>
<td>56</td>
<td><a href="/wiki/Etisalat" title="Etisalat">Etisalat</a></td>
<td>example +971 560 000 000 with country code is 12 digits
</td></tr>
<tr>
<td>58</td>
<td><a href="/wiki/Du_(telco)" class="mw-redirect" title="Du (telco)">Du</a></td>
<td>example +971 580 000 000 with country code is 12 digits
</td></tr>
<tr>
<td rowspan="9"><span class="anchor" id="United_Kingdom"></span><a href="/wiki/United_Kingdom" title="United Kingdom">United Kingdom</a><sup id="cite_ref-07numbers_13-0" class="reference"><a href="#cite_note-07numbers-13">[11]</a></sup></td>
<td rowspan="9"><a href="/wiki/Telephone_numbers_in_the_United_Kingdom" title="Telephone numbers in the United Kingdom">+44</a></td>
<td>71xx</td>
<td rowspan="9">10</td>
<td></td>
<td>
</td></tr>
<tr>
<td>72xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td>73xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td>74xx</td>
<td><a href="/wiki/Hutchison_3G" class="mw-redirect" title="Hutchison 3G">3</a> (<a href="/wiki/Hutchison_3G" class="mw-redirect" title="Hutchison 3G">Hutchison 3G UK Ltd</a>)
</td>
<td>
</td></tr>
<tr>
<td>75xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td>7624</td>
<td>Isle of Man</td>
<td>76xx is mostly radiopaging
</td></tr>
<tr>
<td>77xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td>78xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td>79xx</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/United_States" title="United States">United States</a> (USA)</td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">+1</a></td>
<td>No clear distinction between land and cell numbers.<br>
<p>Area code structure: <br>N-X-Y<br>
N is not 0 or 1<br>
X is not 9<br>
X ≠ Y
</p>
</td>
<td>10</td>
<td></td>
<td>Mobile phones use geographic area codes. However, there are exchange codes used for only mobile devices. Also, some <a href="/wiki/Overlay_plan" title="Overlay plan">overlay area codes</a> are only used on mobile devices, or special internet phone systems other than most VoIP systems (e.g.: <a href="/wiki/Google_Voice" title="Google Voice">Google Voice</a>, <a href="/w/index.php?title=EFax_(fax_service)&amp;action=edit&amp;redlink=1" class="new" title="EFax (fax service) (page does not exist)">eFax</a>, <a href="/wiki/EVoice" title="EVoice">eVoice</a>).
</td></tr>
<tr>
<td><a href="/wiki/United_States_Virgin_Islands" title="United States Virgin Islands">United States Virgin Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_340" title="Area code 340">340</a></td>
<td>10</td>
<td></td>
<td><a href="/wiki/North_American_Numbering_Plan" title="North American Numbering Plan">NANP</a> member, no mobile-specific prefix
</td></tr>
<tr>
<td rowspan="8"><a href="/wiki/Uruguay" title="Uruguay">Uruguay</a></td>
<td rowspan="8"><a href="/wiki/%2B598" class="mw-redirect" title="+598">+598</a></td>
<td>91</td>
<td rowspan="8">?</td>
<td><a href="/wiki/Ancel" title="Ancel">Ancel</a></td>
<td>
</td></tr>
<tr>
<td>93</td>
<td rowspan="3"><a href="/wiki/Movistar" title="Movistar">Movistar</a></td>
<td>
</td></tr>
<tr>
<td>94</td>
<td>
</td></tr>
<tr>
<td>95</td>
<td>
</td></tr>
<tr>
<td>96</td>
<td rowspan="2"><a href="/wiki/Claro_Americas" class="mw-redirect" title="Claro Americas">Claro</a></td>
<td>
</td></tr>
<tr>
<td>97</td>
<td>
</td></tr>
<tr>
<td>98</td>
<td rowspan="2"><a href="/wiki/Ancel" title="Ancel">Ancel</a></td>
<td>
</td></tr>
<tr>
<td>99</td>
<td>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Uzbekistan" title="Uzbekistan">Uzbekistan</a></td>
<td rowspan="6"><a href="/wiki/%2B998" class="mw-redirect" title="+998">+998</a></td>
<td>90</td>
<td rowspan="6">?</td>
<td rowspan="2"><a href="/wiki/Beeline_(brand)" title="Beeline (brand)">Beeline</a> ("Unitel" LLC subsidiary of "ВымпелКом" PTD)</td>
<td>
</td></tr>
<tr>
<td>91</td>
<td>
</td></tr>
<tr>
<td>93</td>
<td rowspan="2"><a href="/w/index.php?title=UCell&amp;action=edit&amp;redlink=1" class="new" title="UCell (page does not exist)">UCell</a> ("COSCOM" LLC subsidiary of "TeliaSonera" Public Enterprise)</td>
<td>
</td></tr>
<tr>
<td>94</td>
<td>
</td></tr>
<tr>
<td>97</td>
<td><a href="/w/index.php?title=UMS_(network_provider)&amp;action=edit&amp;redlink=1" class="new" title="UMS (network provider) (page does not exist)">UMS</a> ("Uzdunrobita" LLC subsidiary of "Мобильные ТелеСистемы" PTD)</td>
<td>
</td></tr>
<tr>
<td>33</td>
<td><a href="/w/index.php?title=Humans.uz&amp;action=edit&amp;redlink=1" class="new" title="Humans.uz (page does not exist)">Humans.uz</a></td>
<td>
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Vanuatu" title="Vanuatu">Vanuatu</a></td>
<td rowspan="2"><a href="/wiki/%2B678" class="mw-redirect" title="+678">+678</a></td>
<td>4</td>
<td rowspan="2">?</td>
<td></td>
<td>
</td></tr>
<tr>
<td>5</td>
<td></td>
<td>
</td></tr>
<tr>
<td><span class="anchor" id="Vatican_City"></span><a href="/wiki/Vatican_City" title="Vatican City">Vatican City</a></td>
<td>+39</td>
<td><a href="/wiki/Telephone_numbers_in_Vatican_City" title="Telephone numbers in Vatican City">06 698</a></td>
<td>10</td>
<td></td>
<td>See also <a href="#Italy">Italy</a>
</td></tr>
<tr>
<td rowspan="6"><a href="/wiki/Venezuela" title="Venezuela">Venezuela</a></td>
<td rowspan="6"><a href="/wiki/%2B58" class="mw-redirect" title="+58">+58</a></td>
<td>4xx</td>
<td rowspan="6">7</td>
<td></td>
<td>
</td></tr>
<tr>
<td>412</td>
<td><a href="/wiki/Digitel_GSM" title="Digitel GSM">Digitel GSM</a></td>
<td>
</td></tr>
<tr>
<td>414</td>
<td><a href="/wiki/Movistar" title="Movistar">Movistar</a></td>
<td>
</td></tr>
<tr>
<td>416</td>
<td><a href="/wiki/Movilnet" class="mw-redirect" title="Movilnet">Movilnet</a></td>
<td>
</td></tr>
<tr>
<td>424</td>
<td><a href="/wiki/Movistar" title="Movistar">Movistar</a></td>
<td>
</td></tr>
<tr>
<td>426</td>
<td><a href="/wiki/Movilnet" class="mw-redirect" title="Movilnet">Movilnet</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Vietnam" title="Vietnam">Vietnam</a></td>
<td><a href="/wiki/%2B84" class="mw-redirect" title="+84">+84</a></td>
<td>3x, 5x, 7x, 8x, 9x</td>
<td>9</td>
<td></td>
<td>See <a href="/wiki/Telephone_numbers_in_Vietnam" title="Telephone numbers in Vietnam">Telephone numbers in Vietnam</a>
</td></tr>
<tr>
<td><a href="/wiki/U.S._Virgin_Islands" class="mw-redirect" title="U.S. Virgin Islands">U.S. Virgin Islands</a></td>
<td>+1</td>
<td><a href="/wiki/Area_code_340" title="Area code 340">340</a></td>
<td>10</td>
<td></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Wales" title="Wales">Wales</a></td>
<td>+44</td>
<td></td>
<td>10</td>
<td></td>
<td>See <a href="#United_Kingdom">United Kingdom</a>
</td></tr>
<tr>
<td><a href="/wiki/Wallis_and_Futuna" title="Wallis and Futuna">Wallis and Futuna</a></td>
<td><a href="/wiki/%2B681" class="mw-redirect" title="+681">+681</a></td>
<td>??</td>
<td>?</td>
<td></td>
<td>
</td></tr>

<tr>
<td><a href="/wiki/Telephone_numbers_in_Western_Sahara" title="Telephone numbers in Western Sahara">5289</a></td>
<td>?</td>
<td>
</td></tr>
<tr>
<td rowspan="5"><a href="/wiki/Yemen" title="Yemen">Yemen</a></td>
<td rowspan="5"><a href="/wiki/%2B967" class="mw-redirect" title="+967">+967</a></td>
<td>7x</td>
<td rowspan="5">9</td>
<td></td>
<td>
</td></tr>
<tr>
<td>70</td>
<td><a href="/w/index.php?title=Y_(Yemen)&amp;action=edit&amp;redlink=1" class="new" title="Y (Yemen) (page does not exist)">Y (Yemen)</a></td>
<td>
</td></tr>
<tr>
<td>71</td>
<td><a href="/wiki/Sabafon" title="Sabafon">Sabafon</a></td>
<td>
</td></tr>
<tr>
<td>73</td>
<td><a href="/wiki/MTN_Group" title="MTN Group">MTN</a></td>
<td>
</td></tr>
<tr>
<td>77</td>
<td><a href="/wiki/Yemen_Mobile" title="Yemen Mobile">Yemen Mobile</a></td>
<td>
</td></tr>
<tr>
<td><a href="/wiki/Zambia" title="Zambia">Zambia</a></td>
<td><a href="/wiki/%2B260" class="mw-redirect" title="+260">+260</a></td>
<td>9x</td>
<td>?</td>
<td></td>
<td>
</td></tr>
<tr>
<td rowspan="3"><a href="/wiki/Zimbabwe" title="Zimbabwe">Zimbabwe</a></td>
<td rowspan="3"><a href="/wiki/%2B263" class="mw-redirect" title="+263">+263</a></td>
<td>71</td>
<td rowspan="3">9</td>
<td><a href="/w/index.php?title=Net_One&amp;action=edit&amp;redlink=1" class="new" title="Net One (page does not exist)">Net One</a></td>
<td>
</td></tr>
<tr>
<td>73</td>
<td><a href="/wiki/Telecel_Zimbabwe" title="Telecel Zimbabwe">Telecel Zimbabwe</a></td>
<td>
</td></tr>
<tr>
<td>77</td>
<td><a href="/w/index.php?title=Econet_Zimbabwe&amp;action=edit&amp;redlink=1" class="new" title="Econet Zimbabwe (page does not exist)">Econet Zimbabwe</a></td>
<td>
</td></tr></tbody><tfoot></tfoot></table>`;

function getPrefixMobile($, tr, start, final, list = [], first = true) {

  if (start <= final) {

    let position = first ? 2 : 0;
    let currentTr = $($(tr[start]).children('td')[position]).text().trim();

    if (currentTr.search(/,|\//) != -1) {

      let tdsplit = currentTr.split(/,|\//)

      tdsplit.forEach((pref) => {

        if (pref.search(/–|-/) != -1) {

          let splitTd = pref.split(/–|-/).map((e) => {
            return e.trim().replace(/[^0-9 ]/g, '');
          })

          if (splitTd.length) {

            for (let a = splitTd[0]; a <= splitTd[1]; a++) {
              let number = a.toString();

              list.push(number)
            }
          }

        } else {
          list.push(pref.trim().replace(/[^0-9 ]/g, ''));
        }
      })


    } else if (currentTr.search(/–|-/) != -1) {

      let splitTd = currentTr.split(/–|-/).map((pref) => {
        return pref.trim().replace(/[^0-9 ]/g, '');
      })

      if (splitTd.length) {
        for (let i = splitTd[0]; i <= splitTd[1]; i++) {
          let number = i.toString();
          list.push(number)
        }
      }

    } else {
      currentTr = currentTr.replace(/[^0-9 ]/g, '');

      if (currentTr.length) {
        list.push(currentTr);
      }
    }

    ++start;
    return getPrefixMobile($, tr, start, final, list, false)
  } else {
    return list;
  }
}

function getPrefix($, tr, total, count = 0, list = []) {
  if (total > count) {

    let currentTr = $(tr[count])

    let td1 = $(currentTr.children('td')[0]);
    let td2 = $(currentTr.children('td')[1]);
    let td4 = $(currentTr.children('td')[3]);

    let rowSpan = td1.attr('rowspan');
    let numberRow = 0;
    let totalRow = 0;

    if (rowSpan) {
      numberRow = Number.parseInt(rowSpan)
      totalRow += numberRow + count
      --totalRow
    } else {
      totalRow = count
    }
    let listPrefix = getPrefixMobile($, tr, count, totalRow);

    if (rowSpan) {
      count += numberRow;
    } else {
      ++count;
    }

    // size
    let size = td4.text().trim()
    size = size.replace(/\[.*\]|\(.*\)/g, '')

    size = size.replace(/[^0-9]/, '')

    list.push({
      country: td1.text().trim().replace(/\[.*\]|\(.*\)/g, ''),
      prefix: td2.text().trim().replace(/[^0-9-]/, ''),
      prefix_mobile: listPrefix,
      size: size
    })

    return getPrefix($, tr, total, count, list);
  } else {
    return list;
  }
}

let $ = cheerio.load(table);
let tr = $('tbody tr');
let prefixs = getPrefix($, tr, tr.length);

let data = JSON.stringify(prefixs);
fs.writeFileSync('countries-prefixs-complete.json', data);