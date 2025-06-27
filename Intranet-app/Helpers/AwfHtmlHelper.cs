using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using System.Reflection;

namespace Intranet_app.Helpers
{
    public enum AwfHtmlInputType
    {
        Text,
        Currency,
        Percentage,
        Number
    }

    public enum AwfHtmlMessageType
    {
        Info,
        Warning,
        Error,
        Default
    }

    public static class AwfHtmlHelper
    {
        public static string GetName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var memberNames = new List<string>();
            var memberExpression = expression.Body as MemberExpression;
            while (memberExpression != null)
            {
                memberNames.Add(memberExpression.Member.Name);
                memberExpression = memberExpression.Expression as MemberExpression;
            }

            memberNames.Reverse();
            string fullName = string.Join(".", memberNames.ToArray());
            return fullName;
        }

        public static string GetValue<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression, TModel model)
        {
            var members = new List<PropertyInfo>();
            var memberExpression = expression.Body as MemberExpression;
            while (memberExpression != null)
            {
                members.Add(memberExpression.Member as PropertyInfo);
                memberExpression = memberExpression.Expression as MemberExpression;
            }
            members.Reverse();
            object info = model;
            foreach (PropertyInfo member in members)
            {
                if (member.GetValue(info) != null)
                {
                    info = member.GetValue(info);
                }
                else
                {
                    info = null;
                    break;
                }
            }
            return info == null ? string.Empty : info.ToString();
        }
    }



}