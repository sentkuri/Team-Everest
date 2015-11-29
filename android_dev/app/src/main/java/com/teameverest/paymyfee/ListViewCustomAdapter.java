package com.teameverest.paymyfee;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class ListViewCustomAdapter extends ArrayAdapter {
    Context context;

    public ListViewCustomAdapter(Context context) {
        super(context, 0);
        this.context = context;

    }

    public int getCount() {
        return 4;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row = convertView;

        if (row == null) {
            LayoutInflater inflater = ((Activity) context).getLayoutInflater();
            row = inflater.inflate(R.layout.row, parent, false);


            TextView textViewTitle = (TextView) row.findViewById(R.id.textView);
            TextView textViewDesc = (TextView) row.findViewById(R.id.textViewDesc);
            ImageView imageViewIte = (ImageView) row.findViewById(R.id.imageView);

            switch (position) {
                case 0:
                    textViewTitle.setText("By City");
                    textViewTitle.setTextColor(Color.parseColor("#6580A5"));
                    textViewDesc.setText("Get the list of students by my city. (MADURAI)");
                    imageViewIte.setImageResource(R.drawable.home_all_icon);
                    break;
                case 1:
                    textViewTitle.setText("By Parent Status");
                    textViewTitle.setTextColor(Color.parseColor("#C4642A"));
                    imageViewIte.setImageResource(R.drawable.home_all_icon);
                    textViewDesc.setText("Get the list of students by student's parents status. (SINGLE)");
                    break;
                case 2:
                    textViewTitle.setText("By Marks Scored");
                    textViewTitle.setTextColor(Color.parseColor("#389606"));
                    imageViewIte.setImageResource(R.drawable.home_all_icon);
                    textViewDesc.setText("Get the list of students by marks scored. Always > 75%");
                    break;
                case 3:
                    textViewTitle.setText("By Income");
                    textViewTitle.setTextColor(Color.parseColor("#D93408"));
                    imageViewIte.setImageResource(R.drawable.home_all_icon);
                    textViewDesc.setText("Get the list of students by parent's monthly income. < Rs. 10,000");
                    break;
            }
        }
        return row;

    }

}