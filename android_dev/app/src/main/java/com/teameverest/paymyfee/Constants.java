/**
 * ****************************************************************************
 * Copyright 2011-2013 Sergey Tarasevich
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * *****************************************************************************
 */
package com.teameverest.paymyfee;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * @author Sergey Tarasevich (nostra13[at]gmail[dot]com)
 */
public final class Constants {

    //Video Related
    public static String[] STUDENTID = null;
    public static String[] STUDENTPICTUREURL = null;
    public static String[] STUDENTNAME = null;
    public static String[] STUDENTDESCRIPTION = null;
    public static final String PAYMYFEEAPI = "http://52.27.127.152/v1/recipients";

    public static String WHICHFRAGMENT = "LIST";



    public static ArrayList<String> ARRAYSTUDENTID = new ArrayList<String>();
    public static ArrayList<String> ARRAYSTUDENTPICTUREURL = new ArrayList<String>();
    public static ArrayList<String> ARRAYSTUDENTNAME = new ArrayList<String>();
    public static ArrayList<String> ARRAYSTUDENTDESCRIPTION = new ArrayList<String>();



    public static HashMap<String, String> WEATHERCONDITIONURL = new HashMap<String, String>();
    public static String[] CITIES = new String[]{
            // Heavy images
    };

    private Constants() {
    }

    public static class Config {
        public static final boolean DEVELOPER_MODE = false;
    }

    public static void ClearStudentList() {
        ARRAYSTUDENTID.clear();
        ARRAYSTUDENTPICTUREURL.clear();
        ARRAYSTUDENTNAME.clear();
        ARRAYSTUDENTDESCRIPTION.clear();
    }



}
