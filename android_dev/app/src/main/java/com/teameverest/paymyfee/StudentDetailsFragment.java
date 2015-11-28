package com.teameverest.paymyfee;

import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.nostra13.universalimageloader.utils.L;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link StudentDetailsFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link StudentDetailsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class StudentDetailsFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    public String studentId;

    private OnFragmentInteractionListener mListener;
    EditText name;
    EditText phonenumber;
    EditText email;
    EditText address;

    public StudentDetailsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment StudentDetailsFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static StudentDetailsFragment newInstance(String param1, String param2) {
        StudentDetailsFragment fragment = new StudentDetailsFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
            studentId = getArguments().getString("studentId");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final View rootView = inflater.inflate(R.layout.fragment_student_details, container, false);
        name = (EditText) rootView.findViewById(R.id.name);
        phonenumber = (EditText) rootView.findViewById(R.id.phone);
        email = (EditText) rootView.findViewById(R.id.email);
        address = (EditText) rootView.findViewById(R.id.address);

        makeJsonArrayRequest(studentId);
        return rootView;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }


    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }

    public void makeJsonArrayRequest(final String studentId) {

        //if (PayMyFeeApplication.getInstance().isOnline()) {

        String urlToPayMyFeeApi = Constants.PAYMYFEEAPI + "/" + studentId;
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
                            JSONObject eachStudent = response.getJSONObject("student");


                            int id = eachStudent.getInt("id");
                            String firstnameVal = eachStudent.getString("firstname");
                            String lastnameVal = eachStudent.getString("lastname");
                            String cityVal = eachStudent.getString("city");
                            String emailVal = eachStudent.getString("email");
                            String contactnumber = eachStudent.getString("contactnumber");
                            String picture = eachStudent.getString("picture");
                            name.setText(firstnameVal + ", " + lastnameVal);
                            email.setText(email.getText() + ": " + emailVal);


                        } catch (JSONException e) {
                            e.printStackTrace();
                            L.e("Error while hitting ES JSON API: " + e.getMessage());
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
}
