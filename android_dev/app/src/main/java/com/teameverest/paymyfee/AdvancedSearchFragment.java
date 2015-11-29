package com.teameverest.paymyfee;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.ArrayList;


public class AdvancedSearchFragment extends android.support.v4.app.Fragment {

    EditText editTextMoneyRequired;
    EditText editTextMarks;
    Spinner ddlParentStatus;
    Spinner ddlCity;
    Button searchBtn;
    ListViewCustomAdapter listViewCustomAdapter;
    String queryString = "";
    public AdvancedSearchFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setRetainInstance(true);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.search_filter, container, false);

        searchBtn = (Button) rootView.findViewById(R.id.btnSearch);
        editTextMoneyRequired = (EditText) rootView.findViewById(R.id.moneyrequired);
        editTextMarks = (EditText) rootView.findViewById(R.id.marks);
        ddlCity = (Spinner) rootView.findViewById(R.id.ddl_city);
        ddlParentStatus = (Spinner) rootView.findViewById(R.id.ddl_parent_status);

        loadCity();
        loadParentStatus();



        searchBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String money = editTextMoneyRequired.getText().toString();
                String marks = editTextMarks.getText().toString();
                String city = ddlCity.getSelectedItem().toString();
                String parentstatus = ddlParentStatus.getSelectedItem().toString();
                boolean ampReq = false;
                String query = "";
                if(money != null && !"".equals(money)){
                    if(ampReq){
                        query += "&";
                    }
                    query += "moneyrequired="+money;
                    ampReq = true;
                }
                if(marks != null && !"".equals(marks)){
                    if(ampReq){
                        query += "&";
                    }
                    query += "marks="+marks;
                    ampReq = true;
                }
                if(city != null && !"".equals(city) && !"Not Applicable".equalsIgnoreCase(city)){
                    if(ampReq){
                        query += "&";
                    }
                    query += "city="+city;
                    ampReq = true;
                }
                if(parentstatus != null && !"".equals(parentstatus) && !"Not Applicable".equalsIgnoreCase(parentstatus)){
                    if(ampReq){
                        query += "&";
                    }
                    query += "singleparent="+ (parentstatus.equalsIgnoreCase("Single Parent") ? "Y" : "N");
                    ampReq = true;
                }
                //money = (money != "")? "&moneyrequired=" + money : "";
                //marks = (marks != "")? "&marks=" + marks : "";
                //city = (city != "" && city != "Not Applicable")? "&city=" + city : "";
                //parentstatus = (parentstatus != "" && parentstatus != "Not Applicable")? "&singleparent=" + parentstatus : "";

                queryString = "?" + query;
                ((MainActivity) getActivity()).displayStudentListFragment(queryString);
            }
        });

        return rootView;
    }


    public void loadCity() {
        final ArrayList<String> invTermOptions = new ArrayList<String>();
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),
                android.R.layout.simple_spinner_item, invTermOptions);
        invTermOptions.add("Not Applicable");
        invTermOptions.add("Madurai");
        invTermOptions.add("Chennai");
        invTermOptions.add("Coimbatore");
        invTermOptions.add("Tirunelveli");
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ddlCity.setAdapter(adapter);
        adapter.notifyDataSetChanged();
    }

    public void loadParentStatus() {
        final ArrayList<String> invTermOptions = new ArrayList<String>();
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),
                android.R.layout.simple_spinner_item, invTermOptions);
        invTermOptions.add("Not Applicable");
        invTermOptions.add("Single Parent");
        invTermOptions.add("No Parent");
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ddlParentStatus.setAdapter(adapter);
        adapter.notifyDataSetChanged();
    }
}
