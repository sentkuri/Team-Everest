/**
 * ****************************************************************************
 * Copyright 2011-2014 Sergey Tarasevich
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

import android.content.Context;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.BaseAdapter;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.display.FadeInBitmapDisplayer;
import com.nostra13.universalimageloader.core.display.SimpleBitmapDisplayer;
import com.nostra13.universalimageloader.core.listener.ImageLoadingListener;
import com.nostra13.universalimageloader.core.listener.SimpleImageLoadingListener;
import com.nostra13.universalimageloader.utils.L;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;


public class StudentListFragment extends Fragment {

    public static final int INDEX = 0;

	/* String[] imageUrls = Constants.IPVTHUMBNAILS;
    String[] vdoUrls = Constants.IPVURLS;
    String[] vdoTitle = Constants.IPVVDOTITLE;
    String[] vdoDuration = Constants.IPVVDODURATION; */

    String[] vdoIds = null;
    String[] vdoThumbnailUrls = null;
    String[] vdoUrls = null;
    String[] vdoTitle = null;
    String[] vdoDuration = null;
    String[] vdoDescription = null;
    String[] vdoPubDate = null;
    String[] vdoUrlToShare = null;

    ImageAdapter imgAdapter;

    DisplayImageOptions options;

    View footer = null;
    View header = null;

    Boolean flag_loading = true;

    protected ListView listView;
    protected LinearLayout linear_layout_cat_vdo_title;
    protected TextView txtCategoryTitle;
    protected RelativeLayout topLevelLayout;
    //protected FrameLayout frameNoResults;

    //private ProgressBar frameProgressBar;

    FrameLayout progressBarHolder;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        options = new DisplayImageOptions.Builder()
                .showImageOnLoading(R.drawable.ic_stub_vdo)
                .showImageForEmptyUri(R.drawable.ic_empty)
                .showImageOnFail(R.drawable.ic_error)
                .cacheInMemory(true)
                .cacheOnDisk(true)
                .considerExifParams(true)
                .displayer(new SimpleBitmapDisplayer())
                .build();


        LayoutInflater layoutInflater = (LayoutInflater) getActivity().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        footer = layoutInflater.inflate(R.layout.list_footer_view, null);

        setRetainInstance(true);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View rootView = inflater.inflate(R.layout.fr_image_list, container, false);
        listView = (ListView) rootView.findViewById(android.R.id.list);





        //L.e("CreateView called");
        listView.setOnItemClickListener(new OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                Bundle bundle = new Bundle();
                bundle.putString("studentId", vdoIds[position]);

                //To Show Ads on first video/story hit

                ((MainActivity) getActivity()).displayStudentDetailsFragment(bundle);


            }
        });


        makeJsonArrayRequest(0, 0);


        return rootView;
    }


    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        setRetainInstance(true);
    }


    private void setIsLoading(boolean isLoading) {
        if (isLoading) {
            listView.addFooterView(footer, null, false);
        } else {
            listView.removeFooterView(footer);
        }
    }


    public void makeJsonArrayRequest(final int getVdosFrom, final int action) {

        //if (PayMyFeeApplication.getInstance().isOnline()) {

            String urlToPayMyFeeApi = Constants.PAYMYFEEAPI;
            flag_loading = true;
            setIsLoading(flag_loading);
            JSONObject jsonRequest = null;
            try {
                //frameNoResults.setVisibility(View.GONE);
                //Clear for Search results
                jsonRequest = new JSONObject("{\"sort\" : [{\"post_date\" : {\"order\" : \"desc\"}}], \"size\" : 10, \"from\" : 1}");

            } catch (JSONException e) {
                e.printStackTrace();
            }

            JsonObjectRequest req = new JsonObjectRequest(Request.Method.GET, urlToPayMyFeeApi, jsonRequest,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            //Log.d(TAG, response.toString());
                            try {
                                JSONArray jsonArray = response.getJSONArray("students");

                                if (jsonArray.length() > 0) {

                                    for (int i = 0, size = jsonArray.length(); i < size; i++) {
                                        //JSONObject objectInArray = jsonArray.getJSONObject(i);
                                        //objectInArray.getString
                                        JSONObject eachStudent = jsonArray.getJSONObject(i);

                                        //JSONObject vdoFields = eachVdoHits.getJSONObject("fields");

                                        int id = eachStudent.getInt("id");
                                        String firstname = eachStudent.getString("firstname");
                                        String lastname = eachStudent.getString("lastname");
                                        String city = eachStudent.getString("city");
                                        //String email = eachStudent.getString("email");
                                        //String contactnumber = eachStudent.getString("contactnumber");
                                        String picture = eachStudent.getString("picture");

                                        Constants.ARRAYSTUDENTID.add(id+"");
                                        Constants.ARRAYSTUDENTPICTUREURL.add(picture);
                                        Constants.ARRAYSTUDENTNAME.add(firstname + lastname);
                                        Constants.ARRAYSTUDENTDESCRIPTION.add(city);
                                    }

                                    L.e("Got json url response, gonna parse");


                                    Constants.STUDENTID = new String[Constants.ARRAYSTUDENTID.size()];
                                    Constants.STUDENTID = Constants.ARRAYSTUDENTID.toArray(Constants.STUDENTID);

                                    Constants.STUDENTNAME = new String[Constants.ARRAYSTUDENTNAME.size()];
                                    Constants.STUDENTNAME = Constants.ARRAYSTUDENTNAME.toArray(Constants.STUDENTNAME);

                                    Constants.STUDENTPICTUREURL = new String[Constants.ARRAYSTUDENTPICTUREURL.size()];
                                    Constants.STUDENTPICTUREURL = Constants.ARRAYSTUDENTPICTUREURL.toArray(Constants.STUDENTPICTUREURL);

                                    Constants.STUDENTDESCRIPTION = new String[Constants.ARRAYSTUDENTDESCRIPTION.size()];
                                    Constants.STUDENTDESCRIPTION = Constants.ARRAYSTUDENTDESCRIPTION.toArray(Constants.STUDENTDESCRIPTION);


                                    vdoIds = Constants.STUDENTID;
                                    vdoThumbnailUrls = Constants.STUDENTPICTUREURL;
                                    vdoTitle = Constants.STUDENTNAME;
                                    vdoDescription = Constants.STUDENTDESCRIPTION;

                                    //listView = (ListView) getView().findViewById(android.R.id.li
                                    //imgAdapter = (ImageAdapter) listView.getAdapter();

                                    if (imgAdapter == null || getVdosFrom == 0) {
                                        imgAdapter = new ImageAdapter();

                                        listView.setAdapter(imgAdapter);
                                        //L.e("imgAdapter is null, so created new");
                                        //Constants.isImagesAlreadyLoaded = true;
                                    } else {
                                        // save index and top position
                                        int index = listView.getFirstVisiblePosition();
                                        View v = listView.getChildAt(0);
                                        int top = (v == null) ? 0 : (v.getTop() - listView.getPaddingTop());

                                        //setIsLoading(flag_loading);
                                        imgAdapter.notifyDataSetChanged();

                                        // restore index and position
                                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                                            listView.smoothScrollToPositionFromTop(index, top);
                                        } else {
                                            listView.setSelection(index);
                                        }
                                        //L.e("imgAdapter is NOT NULL, so reused");
                                    }
                                    //L.e("Setting adapter");


                                    flag_loading = false;
                                    setIsLoading(flag_loading);
                                    //progressBarHolder.setVisibility(View.GONE);
                                    //frameNoResults.setVisibility(View.VISIBLE);
                                    //listView.setAdapter( new ArrayAdapter( this, R.layout.fr_image_list, new ArrayList() ) );
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                                L.e("Error while hitting ES JSON API: " + e.getMessage());
                                //hidepDialog();
                                //progressBarHolder.setVisibility(View.GONE);
                                if (action == 0 || action == 2) {
                                    //frameProgressBar.setVisibility(View.GONE);
                                    //retryButton.setVisibility(View.VISIBLE);
                                }
                            }
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    L.e("VolleyErr" + error.getMessage());
                    //Toast.makeText(getApplicationContext(),
                    //      error.getMessage(), Toast.LENGTH_SHORT).show();

                }
            });

            req.setRetryPolicy(new DefaultRetryPolicy(30000, 3, 1));
            // Adding request to request queue
            PayMyFeeApplication.getInstance().addToRequestQueue(req);
        /*} else {
            Toast.makeText(getActivity(),
                    "Please check your internet connection", Toast.LENGTH_SHORT).show();
        } */
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        AnimateFirstDisplayListener.displayedImages.clear();
    }


    @Override
    public void onResume() {
        super.onResume();
        //applyScrollListener();
    }


    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.menu_main, menu);
    }


    class ImageAdapter extends BaseAdapter {

        private LayoutInflater inflater;
        private ImageLoadingListener animateFirstListener = new AnimateFirstDisplayListener();

        ImageAdapter() {
            inflater = LayoutInflater.from(getActivity());
        }

        @Override
        public int getCount() {
            return vdoThumbnailUrls.length;
        }

        @Override
        public Object getItem(int position) {
            return position;
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(final int position, View convertView, ViewGroup parent) {
            View view = convertView;
            final ViewHolder holder;
            if (convertView == null) {
                view = inflater.inflate(R.layout.item_list_image, parent, false);
                holder = new ViewHolder();
                holder.textName = (TextView) view.findViewById(R.id.text);
                holder.image = (ImageView) view.findViewById(R.id.image);
                holder.textDesc = (TextView) view.findViewById(R.id.textVwDesc);
                //holder.ivImageDownloadTut = (ImageView) view.findViewById(R.id.ivInstruction);
                view.setTag(holder);
            } else {
                holder = (ViewHolder) view.getTag();
            }


           /* holder.imageDetails.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int pos = listView.getPositionForView(v);
                    VideoEntity currVideo = new VideoEntity(vdoIds[pos], vdoUrls[pos], vdoUrlToShare[pos],
                            vdoTitle[pos], vdoDescription[pos], vdoThumbnailUrls[pos], vdoDuration[pos]);
                    showMenu(v, currVideo);
                }
            }); */


            //holder.text.setText("Item " + (position + 1));
            holder.textName.setText(vdoTitle[position]);
            holder.textDesc.setText(vdoDescription[position]);
            ImageLoader.getInstance().displayImage(vdoThumbnailUrls[position], holder.image, options, animateFirstListener);

            return view;
        }
    }

    private static class ViewHolder {
        TextView textName;
        ImageView image;
        TextView textDesc;
        //ImageView ivImageDownloadTut;
    }

    private static class AnimateFirstDisplayListener extends SimpleImageLoadingListener {

        static final List<String> displayedImages = Collections.synchronizedList(new LinkedList<String>());

        @Override
        public void onLoadingComplete(String imageUri, View view, Bitmap loadedImage) {
            if (loadedImage != null) {
                ImageView imageView = (ImageView) view;
                boolean firstDisplay = !displayedImages.contains(imageUri);
                if (firstDisplay) {
                    FadeInBitmapDisplayer.animate(imageView, 500);
                    displayedImages.add(imageUri);
                }
            }
        }
    }
}