package com.teameverest.paymyfee;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;


public class HomeScreenFragment extends android.support.v4.app.Fragment {

    ListView listView;
    ListViewCustomAdapter listViewCustomAdapter;
    Button launchSearch;

    public HomeScreenFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.list_home_fragment, container, false);

        listView = (ListView) rootView.findViewById(R.id.listViewHomeScreen);
        // Create the Custom Adapter Object
        listViewCustomAdapter = new ListViewCustomAdapter(getActivity());
        // Set the Adapter to GridView
        listView.setAdapter(listViewCustomAdapter);

        // Handling touch/click Event on GridView Item
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View v, int position, long arg3) {
                switch (position) {
                    case 0: //By City
                        ((MainActivity) getActivity()).displayStudentListFragment("?city=Madurai");
                        break;
                    case 1: //By Parent Status
                        ((MainActivity) getActivity()).displayStudentListFragment("?singleparent=y");
                        break;
                    case 2: //By Marks Scored
                        ((MainActivity) getActivity()).displayStudentListFragment("?marks=75");
                        break;
                    case 3: //By City
                        ((MainActivity) getActivity()).displayStudentListFragment("?moneyrequired=10000");
                        break;

                }
            }
        });

        launchSearch = (Button) rootView.findViewById(R.id.buttonAdvSrch);

        launchSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ((MainActivity) getActivity()).advSearchFragment();
            }
        });

        return rootView;
    }


}
