import React from 'react'

function like({ width = 30, height = 30 }) {
    return (
        <button>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width={width} height={height} viewBox="0 0 1192.000000 1280.000000"
                preserveAspectRatio="xMidYMid meet">
                <metadata>
                    Created by potrace 1.15, written by Peter Selinger 2001-2017
                </metadata>
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M5185 12785 c-497 -93 -898 -497 -1034 -1040 -23 -92 -38 -190 -86
-547 -30 -225 -37 -263 -63 -315 -16 -32 -154 -326 -307 -653 -152 -327 -525
-1126 -827 -1775 -759 -1627 -699 -1493 -739 -1652 l-23 -91 -481 -5 c-524 -5
-563 -9 -739 -68 -198 -66 -379 -182 -526 -335 -201 -210 -315 -453 -350 -744
-8 -69 -10 -622 -8 -1990 4 -2079 0 -1920 63 -2120 123 -384 441 -704 825
-830 197 -64 170 -63 1129 -67 l875 -4 60 -48 c269 -212 586 -365 910 -441
242 -56 187 -54 1566 -58 882 -2 1317 0 1410 8 89 7 595 12 1460 13 1451 3
1363 0 1546 63 372 127 670 456 765 845 32 133 32 335 0 468 -52 210 -152 390
-308 552 l-64 66 88 16 c326 60 601 245 790 532 293 443 226 1006 -164 1392
l-62 61 67 12 c528 91 962 598 962 1125 0 292 -144 608 -376 824 -186 174
-434 290 -656 308 l-78 6 68 71 c112 119 191 251 241 404 45 136 54 216 48
428 -5 225 -20 291 -102 460 -138 284 -370 488 -661 583 -167 54 -131 53
-1884 48 -894 -3 -1634 -6 -1645 -7 -11 -1 -181 2 -377 6 -356 7 -358 7 -353
28 3 12 23 156 45 321 69 507 319 2321 342 2480 29 197 31 485 4 620 -107 540
-466 937 -941 1041 -102 22 -312 27 -410 9z"/>
                </g>
            </svg>
            Me gusta
        </button>
    )
}

export default like